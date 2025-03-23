"use client";

import { ChangeEvent } from "react";
import Section from "@/components/Section/Section";
import { useLoanSelection } from "@/hooks/Loan/useLoanSelection";
import { LoanCalculatorType, Tenure } from "@/types/ConfigTypes";
import {
  defaultLoanTenureYears,
  labels,
  defaultLoanInterestRates,
  defaultLoanTenureMonths,
  defaultLoanAmount,
} from "./constants";
import InputElement from "../../InputElement/InputElement";
import TenureInputElement from "../../TenureInputElement/TenureInputElement";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  loanCalculatorType: LoanCalculatorType;
  loanAmount: number;
  roi: string;
  tenure: Tenure;
  isValidForm: boolean;
  calculate: () => void;
  handleLoanAmountChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    amount?: string
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

const CommonLoanCalculatorInput = ({
  loanCalculatorType,
  loanAmount,
  roi,
  tenure,
  isValidForm,
  calculate,
  handleLoanAmountChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    isActiveLoanAmountButton,
    isActiveYearButton,
    isActiveMonthButton,
    isActiveROIButton,
    selectLoanAmount,
    selectYears,
    selectMonths,
    selectROI,
  } = useLoanSelection({
    loanAmount,
    tenure,
    roi,
    handleLoanAmountChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  });

  return (
    <Section title={labels[loanCalculatorType].title}>
      <InputElement
        value={loanAmount}
        buttonsData={defaultLoanAmount}
        label={labels[loanCalculatorType].loanAmount}
        placeholder={labels[loanCalculatorType].loanAmountPlaceholder}
        isPrice={true}
        handleChange={handleLoanAmountChange}
        isActiveShortcutButton={isActiveLoanAmountButton}
        selectShortcutButton={selectLoanAmount}
      />

      <InputElement
        value={roi}
        buttonsData={defaultLoanInterestRates}
        label={labels[loanCalculatorType].roi}
        placeholder={labels[loanCalculatorType].roiPlaceholder}
        handleChange={handleROIChange}
        isActiveShortcutButton={isActiveROIButton}
        selectShortcutButton={selectROI}
        isROI
      />

      <TenureInputElement
        tenure={tenure}
        label={labels[loanCalculatorType].tenure}
        placeholderYears={labels[loanCalculatorType].tenureYearsPlaceholder}
        placeholderMonths={labels[loanCalculatorType].tenureMonthsPlaceholder}
        yearsData={defaultLoanTenureYears}
        monthsData={defaultLoanTenureMonths}
        handleYearChange={handleTenureYearsChange}
        handleMonthChange={handleTenureMonthsChange}
        isActiveYearButton={isActiveYearButton}
        isActiveMonthButton={isActiveMonthButton}
        selectYears={selectYears}
        selectMonths={selectMonths}
        showMonths
      />
      {isMobile && (
        <LargeButton onClick={calculate} disabled={!isValidForm} centered>
          CALCULATE
        </LargeButton>
      )}
    </Section>
  );
};

export default CommonLoanCalculatorInput;
