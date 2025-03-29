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
import { usePrepayment } from "./usePrepayments";

export const useLoanAmortisation = (
  loanAmount: number,
  roi: string,
  tenure: Tenure,
  startDate?: string
) => {
  const tenureMonths = tenure.years * 12 + tenure.months;
  const [yearlyRowData, setYearlyRowData] = useState<AmortisationRow[]>([]);
  const [monthlyRowData, setMonthlyRowData] = useState<AmortisationRow[]>([]);
  const [emi, setEmi] = useState(0);
  const sanitizedROI = sanitizeROI(roi);
  const isIncompleteROT = sanitizedROI[sanitizedROI.length - 1] === ".";
  const rateOfInterest = isIncompleteROT
    ? parseFloat(sanitizedROI.split(".")[0])
    : parseFloat(sanitizedROI);
  const baseDate = startDate ? dayjs(startDate) : dayjs();

  const { prepayments, hasPrepayments } = usePrepayment({
    // monthlyPrepaymentStartDate: "2025-01-01",
    // monthlyPrepaymentAmount: 5000,
    // quarterlyPrepaymentStartDate: "2025-03-01",
    // quarterlyPrepaymentAmount: 10000,
    // halfAnnualyPrepaymentStartDate: "2025-06-01",
    // halfAnnualyPrepaymentAmount: 15000,
    // annuallyPrepaymentStartDate: "2025-12-01",
    // annuallyPrepaymentAmount: 20000,
    oneTimePrepayments: [
      {
        startDate: 202608,
        amount: 0,
      },
    ],
  });

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
      const interest = balance * monthlyRate;
      const isBalanceFullyPaid = emi - interest >= balance;
      const principal = isBalanceFullyPaid ? balance : emi - interest;
      const emiDate = baseDate.add(i, "month");
      const monthYear = Number(emiDate.format("YYYYMM"));
      const prepayment = prepayments[monthYear] || 0;
      const totalPaid = isBalanceFullyPaid
        ? principal + interest + prepayment
        : emi + prepayment;

      balance -= principal + prepayment;
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

    setYearlyRowData(formattedYearlyData);
    setMonthlyRowData(monthlyData);
  }, [loanAmount, rateOfInterest, tenureMonths, baseDate, prepayments]);

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
        emi,
        monthYear,
      };
      generatePDF(tableData, loanData, tableFrequency, hasPrepayments);
    },
    [
      baseDate,
      emi,
      loanAmount,
      monthlyRowData,
      rateOfInterest,
      tenureMonths,
      yearlyRowData,
      hasPrepayments,
    ]
  );

  useEffect(() => {
    calculateAmortisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, roi, tenureMonths, startDate]);

  return {
    hasPrepayments,
    yearlyRowData,
    monthlyRowData,
    downloadAmortisation,
  };
};
