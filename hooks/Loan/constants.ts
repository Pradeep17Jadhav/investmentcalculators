import { Currency } from "@/contexts/currency";
import { LoanCalculatorType } from "@/types/ConfigTypes";
import {
  getHomeLoanAmount,
  getHomeLoanRoi,
  getPersonalLoanAmount,
  getPersonalLoanRoi,
} from "@/components/Common/LoanCalculator/defaultValuesConstants";

export const getDefaultLoanValues = (
  type: LoanCalculatorType,
  currency: Currency
) => {
  switch (type) {
    case LoanCalculatorType.HOME:
      return {
        defaultLoanAmount: getHomeLoanAmount(currency),
        defaultRoi: getHomeLoanRoi(currency),
      };

    case LoanCalculatorType.PERSONAL:
      return {
        defaultLoanAmount: getPersonalLoanAmount(currency),
        defaultRoi: getPersonalLoanRoi(currency),
      };

    default:
      return {
        defaultLoanAmount: 50000,
        defaultRoi: "8",
      };
  }
};
