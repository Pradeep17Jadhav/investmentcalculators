import { CalculatorType } from "@/types/ConfigTypes";

export const MIN_MONTHLY_INVESTMENT = 0;
export const MAX_MONTHLY_INVESTMENT = 1000000; //10 L
export const MONTHLY_INVESTMENT_STEP = 1000;

export const MIN_INCOME = 0;
export const MAX_INCOME = 100000000; //10 Cr
export const INCOME_STEP = 100000;

export const MIN_INVESTMENT = 0;
export const MAX_INVESTMENT = 1000000000; //100 Cr
export const INVESTMENT_STEP = 5000;

export const MIN_LOAN_AMOUNT = 0;
export const MAX_LOAN_AMOUNT = 1000000000;

export const MIN_ROI = 0;
export const MAX_ROI = 100;
export const ROI_STEP = 0.25;

export const getMaximumInvestment = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.RD:
    case CalculatorType.SIP:
      return MAX_MONTHLY_INVESTMENT;
    case CalculatorType.FD:
    case CalculatorType.LUMPSUM:
      return MAX_INVESTMENT;
  }
};
