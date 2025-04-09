import { ChangeEvent, useCallback } from "react";
import { Tenure } from "@/types/ConfigTypes";

type LoanSelectionProps = {
  loanAmount?: number;
  initialInvestment?: number;
  investment?: number;
  tenure: Tenure;
  roi: string;
  handleLoanAmountChange?: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    amount?: string
  ) => void;
  handleInvestmentChange?: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    investment?: string
  ) => void;
  handleInitialInvestmentChange?: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    initialInvestment?: string
  ) => void;
  handleROIChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    roi?: string
  ) => void;
  handleTenureYearsChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    years?: string
  ) => void;
  handleTenureMonthsChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    months?: string
  ) => void;
};

export const useAmountSelection = ({
  loanAmount,
  initialInvestment,
  investment,
  tenure,
  roi,
  handleLoanAmountChange,
  handleInitialInvestmentChange,
  handleInvestmentChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
}: LoanSelectionProps) => {
  const isActiveLoanAmountButton = useCallback(
    (amount: number) => amount === loanAmount,
    [loanAmount]
  );

  const isActiveInitialInvestmentButton = useCallback(
    (initInvt: number) => initInvt === initialInvestment,
    [initialInvestment]
  );

  const isActiveInvestmentButton = useCallback(
    (invt: number) => invt === investment,
    [investment]
  );

  const isActiveYearButton = useCallback(
    (years: number) => years === tenure.years,
    [tenure.years]
  );

  const isActiveMonthButton = useCallback(
    (months: number) => months === tenure.months,
    [tenure.months]
  );

  const isActiveROIButton = useCallback(
    (selectedROI: number) => selectedROI.toString() === roi,
    [roi]
  );

  const selectLoanAmount = useCallback(
    (amount: number) => () =>
      handleLoanAmountChange?.(undefined, amount.toString()),
    [handleLoanAmountChange]
  );

  const selectInvestment = useCallback(
    (investment: number) => () =>
      handleInvestmentChange?.(undefined, investment.toString()),
    [handleInvestmentChange]
  );

  const selectInitialInvestment = useCallback(
    (initialInvestment: number) => () =>
      handleInitialInvestmentChange?.(undefined, initialInvestment.toString()),
    [handleInitialInvestmentChange]
  );

  const selectYears = useCallback(
    (years: number) => () =>
      handleTenureYearsChange(undefined, years.toString()),
    [handleTenureYearsChange]
  );

  const selectMonths = useCallback(
    (months: number) => () =>
      handleTenureMonthsChange(undefined, months.toString()),
    [handleTenureMonthsChange]
  );

  const selectROI = useCallback(
    (roi: number) => () => handleROIChange(undefined, roi.toString()),
    [handleROIChange]
  );

  return {
    isActiveLoanAmountButton,
    isActiveInitialInvestmentButton,
    isActiveInvestmentButton,
    isActiveYearButton,
    isActiveMonthButton,
    isActiveROIButton,
    selectLoanAmount,
    selectInitialInvestment,
    selectInvestment,
    selectYears,
    selectMonths,
    selectROI,
  };
};
