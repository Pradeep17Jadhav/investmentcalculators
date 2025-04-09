import { CalculatorType } from "@/types/ConfigTypes";
import {
  defaultInvestmentAmount,
  defaultInvestmentReturnsRate,
  defaultOneTimeAmount,
  FDInvestmentReturnsRate,
  RDInvestmentReturnsRate,
} from "./constants";

export const getInitialInvestmentShortcutData = () => {
  return defaultOneTimeAmount;
};

export const getInvestmentShortcutData = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.SIP:
      return defaultInvestmentAmount;
    case CalculatorType.FD:
      return defaultOneTimeAmount;
    case CalculatorType.RD:
      return defaultInvestmentAmount;
    case CalculatorType.LUMPSUM:
      return defaultOneTimeAmount;
  }
};

export const getRoiShortcutData = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.SIP:
      return defaultInvestmentReturnsRate;
    case CalculatorType.FD:
      return FDInvestmentReturnsRate;
    case CalculatorType.RD:
      return RDInvestmentReturnsRate;
    case CalculatorType.LUMPSUM:
      return defaultInvestmentReturnsRate;
  }
};
