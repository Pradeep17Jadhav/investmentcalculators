import { CalculatorType } from "@/types/ConfigTypes";

type CalculatorInputLabels = {
  [key in CalculatorType]: {
    title: string;
    investment: string;
    returns: string;
    tenure: string;
    roiPlaceholder: string;
    tenureYearsPlaceholder: string;
    tenureMonthsPlaceholder: string;
    investmentPlaceholder: string;
  };
};

const commonInputLabels = {
  returns: "Expected Returns",
  tenure: "Investment Period",
  roiPlaceholder: "12.25%",
  tenureYearsPlaceholder: "18 yrs",
  tenureMonthsPlaceholder: "9 mos",
  investmentPlaceholder: "25,000",
};

export const commonCalculatorLabels: CalculatorInputLabels = {
  [CalculatorType.SIP]: {
    ...commonInputLabels,
    title: "SIP Details",
    investment: "Monthly Investment",
    returns: "Expected Returns",
  },
  [CalculatorType.FD]: {
    ...commonInputLabels,
    title: "FD Details",
    investment: "Saving Amount",
    investmentPlaceholder: "2,00,000",
  },
  [CalculatorType.RD]: {
    ...commonInputLabels,
    title: "RD Details",
    investment: "Monthly Savings",
  },
  [CalculatorType.Lumpsum]: {
    ...commonInputLabels,
    title: "Lumpsum Investment Details",
    investment: "Investment Amount",
    investmentPlaceholder: "5,00,000",
  },
};

export const defaultInvestmentAmount = [
  { label: "3K", value: 3000 },
  { label: "5K", value: 5000 },
  { label: "10K", value: 10000 },
  { label: "20K", value: 20000 },
  { label: "30K", value: 30000 },
  { label: "50K", value: 50000 },
  { label: "1L", value: 100000 },
];

export const defaultOneTimeAmount = [
  { label: "20K", value: 20000 },
  { label: "50K", value: 50000 },
  { label: "1L", value: 100000 },
  { label: "2L", value: 200000 },
  { label: "5L", value: 500000 },
  { label: "10L", value: 1000000 },
  { label: "20L", value: 2000000 },
];

export const FDInvestmentReturnsRate: number[] = [3, 4, 5, 6, 7, 8];
export const RDInvestmentReturnsRate: number[] = [3, 4, 5, 6, 7, 8];
export const defaultInvestmentReturnsRate: number[] = [
  8, 10, 12, 15, 18, 20, 25,
];
export const defaultInvestmentTenureYears: number[] = [0, 5, 10, 20, 30];
export const defaultInvestmentTenureMonths: number[] = [0, 3, 6, 9];
