import { CalculatorType, Tenure } from "@/types/ConfigTypes";

export const getDefaultStepUp = () => {
  return "10";
};

export const getDefaultROI = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.SIP:
    case CalculatorType.LUMPSUM:
      return "12";
    case CalculatorType.FD:
    case CalculatorType.RD:
      return "7";
  }
};

export const getDefaultInvestment = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.SIP:
    case CalculatorType.RD:
      return 15000;
    case CalculatorType.FD:
    case CalculatorType.LUMPSUM:
      return 100000;
  }
};

export const getDefaultTenure = (calculatorType: CalculatorType): Tenure => {
  switch (calculatorType) {
    case CalculatorType.FD:
    case CalculatorType.RD:
      return {
        years: 2,
        months: 0,
        days: 0,
      };
    case CalculatorType.SIP:
    case CalculatorType.LUMPSUM:
      return {
        years: 15,
        months: 0,
        days: 0,
      };
  }
};
