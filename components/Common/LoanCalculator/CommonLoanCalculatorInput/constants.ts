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
  roiPlaceholder: "Eg. 8.25%",
  tenureYearsPlaceholder: "Eg. 18 years",
  tenureMonthsPlaceholder: "Eg. 9 months",
  loanAmountPlaceholder: "Eg. 50,00,000",
};

export const labels: LoanCalculatorInputLabels = {
  [LoanCalculatorType.HOME]: {
    ...commonInputLabels,
    title: "Loan Details",
    loanAmount: "Loan Amount",
    roi: "Rate of Interest",
    tenure: "Loan Tenure",
  },
  [LoanCalculatorType.CAR]: {
    ...commonInputLabels,
    title: "Car Loan Details",
    loanAmount: "Loan Amount",
    roi: "Rate of Interest",
    tenure: "Loan Tenure",
  },
  [LoanCalculatorType.PERSONAL]: {
    ...commonInputLabels,
    title: "Personal Loan Details",
    loanAmount: "Loan Amount",
    roi: "Rate of Interest",
    tenure: "Loan Tenure",
  },
};

export const defaultLoanAmount = [
  { label: "10L", value: 1000000 },
  { label: "20L", value: 2000000 },
  { label: "30L", value: 3000000 },
  { label: "50L", value: 4000000 },
  { label: "75L", value: 5000000 },
  { label: "1Cr", value: 10000000 },
  { label: "2Cr", value: 20000000 },
];

export const defaultLoanTenureYears: number[] = [0, 5, 10, 20, 30];
export const defaultLoanTenureMonths: number[] = [0, 3, 6, 9];
export const defaultLoanInterestRates: number[] = [
  6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
];
