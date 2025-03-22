import { LoanCalculatorType } from "@/types/ConfigTypes";

type LoanCalculatorInputLabels = {
  [key in LoanCalculatorType]: {
    title: string;
    loanAmount: string;
    roi: string;
    tenure: string;
    roiPlaceholder: string;
    tenureYearsPlaceholder: string;
    tenureMonthsPlaceholder: string;
    loanAmountPlaceholder: string;
  };
};

const commonInputLabels = {
  roi: "Rate of Interest",
  roiPlaceholder: "8.25%",
  tenureYearsPlaceholder: "18 yrs",
  tenureMonthsPlaceholder: "9 mos",
  loanAmountPlaceholder: "50,00,000",
  tenure: "Loan Tenure",
};

export const labels: LoanCalculatorInputLabels = {
  [LoanCalculatorType.HOME]: {
    ...commonInputLabels,
    title: "Loan Details",
    loanAmount: "Loan Amount",
  },
  [LoanCalculatorType.CAR]: {
    ...commonInputLabels,
    title: "Car Loan Details",
    loanAmount: "Loan Amount",
  },
  [LoanCalculatorType.PERSONAL]: {
    ...commonInputLabels,
    title: "Personal Loan Details",
    loanAmount: "Loan Amount",
  },
};

export const defaultLoanAmount = [
  { label: "10L", value: 1000000 },
  { label: "20L", value: 2000000 },
  { label: "30L", value: 3000000 },
  { label: "50L", value: 5000000 },
  { label: "80L", value: 8000000 },
  { label: "1Cr", value: 10000000 },
  { label: "2Cr", value: 20000000 },
];

export const defaultLoanTenureYears: number[] = [0, 5, 10, 20, 30];
export const defaultLoanTenureMonths: number[] = [0, 3, 6, 9];
export const defaultLoanInterestRates: number[] = [6, 7, 8, 9, 10];
