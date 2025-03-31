import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { sanitizeROI, toDecimal } from "@/helpers/numbers";
import {
  AmortisationTableFrequency,
  AmortisationRow,
  LoanData,
} from "@/types/Loan/LoanTypes";
import { generatePDF } from "@/components/Common/LoanCalculator/helpers/pdfGenerator";
import { Tenure } from "@/types/ConfigTypes";
import { PrepaymentsByMonth } from "./usePrepayments";

export const useLoanAmortisation = (
  loanAmount: number,
  roi: string,
  tenure: Tenure,
  prepaymentsByMonth: PrepaymentsByMonth,
  hasPrepayments: boolean
) => {
  const tenureMonths = tenure.years * 12 + tenure.months;
  const [yearlyRowData, setYearlyRowData] = useState<AmortisationRow[]>([]);
  const [monthlyRowData, setMonthlyRowData] = useState<AmortisationRow[]>([]);
  const [interestPaid, setInterestPaid] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);
  const [totalPrepayments, setTotalPrepayments] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [timesPaid, setTimesPaid] = useState(0);
  const [emi, setEmi] = useState(0);
  const sanitizedROI = sanitizeROI(roi);
  const isIncompleteROT = sanitizedROI[sanitizedROI.length - 1] === ".";
  const rateOfInterest = isIncompleteROT
    ? parseFloat(sanitizedROI.split(".")[0])
    : parseFloat(sanitizedROI);
  const baseDate = dayjs();

  const calculateAmortisation = useCallback(() => {
    const monthlyRate = rateOfInterest / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    let balance = loanAmount;
    const monthlyData: AmortisationRow[] = [];
    setEmi(emi);

    const yearData: Record<
      number,
      Omit<AmortisationRow, "loanPaidPercent">
    > = {};

    for (let i = 0; i < tenureMonths; i++) {
      const emiDate = baseDate.add(i, "month");
      const monthYear = Number(emiDate.format("YYYYMM"));
      const availablePrepayment = prepaymentsByMonth[monthYear] || 0;
      const interest = balance * monthlyRate;
      const amountCanBeGivenToPrincipal = emi - interest;
      const isBalanceFullyPaid: boolean =
        amountCanBeGivenToPrincipal >= balance;
      const isBalanceFullyPaidWithPrepayment =
        amountCanBeGivenToPrincipal + availablePrepayment >= balance;
      const prepayment = isBalanceFullyPaid
        ? 0
        : isBalanceFullyPaidWithPrepayment
        ? balance - amountCanBeGivenToPrincipal
        : availablePrepayment;
      const principal = isBalanceFullyPaid
        ? balance
        : amountCanBeGivenToPrincipal;
      const totalPaid = isBalanceFullyPaid
        ? principal + interest + prepayment
        : emi + prepayment;

      balance -= principal + availablePrepayment;
      if (balance < 0) {
        balance = 0;
      }

      const year = emiDate.year();
      if (!yearData[year]) {
        yearData[year] = {
          year,
          principalPaid: 0,
          prepayments: 0,
          interestPaid: 0,
          totalPaid: 0,
          balance: 0,
        };
      }

      yearData[year].principalPaid += principal;
      yearData[year].prepayments += prepayment;
      yearData[year].interestPaid += interest;
      yearData[year].totalPaid += totalPaid;
      yearData[year].balance = Math.max(0, balance);

      monthlyData.push({
        year: monthYear,
        principalPaid: Math.round(principal),
        prepayments: Math.round(prepayment),
        interestPaid: Math.round(interest),
        totalPaid: Math.round(totalPaid),
        balance: Math.round(Math.max(0, balance)),
        loanPaidPercent: toDecimal(((loanAmount - balance) / loanAmount) * 100),
      });

      if (balance === 0) break;
    }

    const formattedYearlyData: AmortisationRow[] = Object.values(yearData).map(
      (yearEntry) => ({
        ...yearEntry,
        principalPaid: Math.round(yearEntry.principalPaid),
        prepayments: Math.round(yearEntry.prepayments),
        interestPaid: Math.round(yearEntry.interestPaid),
        totalPaid: Math.round(yearEntry.totalPaid),
        balance: Math.round(yearEntry.balance),
        loanPaidPercent: toDecimal(
          ((loanAmount - yearEntry.balance) / loanAmount) * 100
        ),
      })
    );

    const { totalInterest, totalPrincipal, totalPrepayments } =
      formattedYearlyData.reduce(
        (acc, yearlyData) => {
          acc.totalInterest += yearlyData.interestPaid;
          acc.totalPrincipal += yearlyData.principalPaid;
          acc.totalPrepayments += yearlyData.prepayments;
          return acc;
        },
        { totalInterest: 0, totalPrincipal: 0, totalPrepayments: 0 }
      );

    const totalPayment = totalInterest + totalPrincipal + totalPrepayments;
    const timesPaid = totalPayment / loanAmount;
    setTotalPayment(totalPayment);
    setYearlyRowData(formattedYearlyData);
    setMonthlyRowData(monthlyData);
    setInterestPaid(totalInterest);
    setPrincipalPaid(totalPrincipal);
    setTotalPrepayments(totalPrepayments);
    setTimesPaid(toDecimal(timesPaid));
  }, [rateOfInterest, loanAmount, tenureMonths, baseDate, prepaymentsByMonth]);

  const downloadAmortisation = useCallback(
    (
      tableFrequency: AmortisationTableFrequency = AmortisationTableFrequency.Monthly
    ) => {
      const tableData =
        tableFrequency === AmortisationTableFrequency.Yearly
          ? yearlyRowData
          : monthlyRowData;
      const monthYear = Number(baseDate.format("YYYYMM"));
      const loanData: LoanData = {
        loanAmount,
        rateOfInterest,
        tenureMonths,
        tenureWithPrepaymentMonths: monthlyRowData.length,
        emi,
        monthYear,
        hasPrepayments,
        totalPrepayments,
        totalPrincipalPaid: principalPaid,
        totalInterestPaid: interestPaid,
      };
      generatePDF(tableData, loanData, tableFrequency);
    },
    [
      baseDate,
      emi,
      hasPrepayments,
      loanAmount,
      monthlyRowData,
      rateOfInterest,
      tenureMonths,
      interestPaid,
      totalPrepayments,
      principalPaid,
      yearlyRowData,
    ]
  );

  useEffect(() => {
    calculateAmortisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, roi, tenureMonths, prepaymentsByMonth, hasPrepayments]);

  return {
    yearlyRowData,
    monthlyRowData,
    downloadAmortisation,
    interestPaidActual: interestPaid,
    principalPaidActual: principalPaid,
    totalPrepayments,
    timesPaidActual: timesPaid,
    totalPaidActual: totalPayment,
  };
};
