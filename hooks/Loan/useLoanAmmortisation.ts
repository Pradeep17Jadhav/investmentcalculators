import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { sanitizeROI, toDecimal } from "@/helpers/numbers";
import { AmortizationRow } from "@/types/Loan/LoanTypes";

export const useLoanAmortization = (
  loanAmount: number,
  roi: string,
  tenureMonths: number,
  startDate?: string
) => {
  const [rowData, setRowData] = useState<AmortizationRow[]>([]);
  const sanitizedROI = sanitizeROI(roi);
  const isIncompleteROT = sanitizedROI[sanitizedROI.length - 1] === ".";
  const rateOfInterest = isIncompleteROT
    ? parseFloat(sanitizedROI.split(".")[0])
    : parseFloat(sanitizedROI);
  const baseDate = startDate ? dayjs(startDate) : dayjs();

  const calculateAmortization = useCallback(() => {
    const monthlyRate = rateOfInterest / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    let balance = loanAmount;
    const yearData: Record<
      number,
      Omit<AmortizationRow, "loanPaidPercent">
    > = {};

    for (let i = 0; i < tenureMonths; i++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;
      const emiDate = baseDate.add(i, "month");
      const year = emiDate.year();

      if (!yearData[year]) {
        yearData[year] = {
          year,
          principalPaid: 0,
          interestPaid: 0,
          totalPaid: 0,
          balance: 0,
        };
      }

      yearData[year].principalPaid += principal;
      yearData[year].interestPaid += interest;
      yearData[year].totalPaid += emi;
      yearData[year].balance = Math.max(0, balance);
    }

    const formattedRowData: AmortizationRow[] = Object.values(yearData).map(
      (yearEntry) => ({
        ...yearEntry,
        principalPaid: Math.round(yearEntry.principalPaid),
        interestPaid: Math.round(yearEntry.interestPaid),
        totalPaid: Math.round(yearEntry.totalPaid),
        balance: Math.round(yearEntry.balance),
        loanPaidPercent: toDecimal(
          ((loanAmount - yearEntry.balance) / loanAmount) * 100
        ),
      })
    );

    setRowData(formattedRowData);
  }, [loanAmount, rateOfInterest, tenureMonths, baseDate]);

  useEffect(() => {
    calculateAmortization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, roi, tenureMonths]);

  return { rowData };
};
