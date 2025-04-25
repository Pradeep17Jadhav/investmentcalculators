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
export const MAX_LOAN_AMOUNT_INR = 1000000000; //100 Cr
export const MAX_LOAN_AMOUNT_JPY = 2000000000; // 200 Cr
export const MAX_LOAN_AMOUNT_SGD = 200000000; // 20 Cr
export const MAX_LOAN_AMOUNT_AUD = 100000000; // 10 Cr
export const MAX_LOAN_AMOUNT_CAD = 100000000; // 10 Cr
export const MAX_LOAN_AMOUNT_CHF = 200000000; //20 Cr
export const MAX_LOAN_AMOUNT_CNY = 500000000; //50 Cr
export const MAX_LOAN_AMOUNT_EUR = 100000000; //10 Cr
export const MAX_LOAN_AMOUNT_GBP = 100000000; //10 Cr
export const MAX_LOAN_AMOUNT_HKD = 500000000; //10 Cr
export const MAX_LOAN_AMOUNT_USD = 200000000; //20 Cr

export const MIN_ROI = 0;
export const MAX_ROI = 100;
export const ROI_STEP = 0.25;

export const MIN_STEP_UP = 0;
export const MAX_STEP_UP = 50;

export const getMinimumInvestment = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.RD:
    case CalculatorType.SIP:
      return MIN_MONTHLY_INVESTMENT;
    case CalculatorType.FD:
    case CalculatorType.LUMPSUM:
      return MIN_INVESTMENT;
  }
};

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

export const getMaximumInitialInvestment = () => {
  return MAX_INVESTMENT;
};
