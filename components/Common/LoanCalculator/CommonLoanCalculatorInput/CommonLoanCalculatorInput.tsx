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
import PrepaymentInputElement from "@/components/Loan/PrepaymentInputElement/PrepaymentInputElement";

type Props = {
  loanCalculatorType: LoanCalculatorType;
  loanAmount: number;
  roi: string;
  tenure: Tenure;
  isValidForm: boolean;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  minRoi: number;
  maxRoi: number;
  stepRoi: number;
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
  getLoanAmountScale: (value: number) => number;
  getLoanAmountInverseScale: (value: number) => number;
};

const CommonLoanCalculatorInput = ({
  loanCalculatorType,
  loanAmount,
  roi,
  tenure,
  isValidForm,
  minAmount,
  maxAmount,
  stepAmount,
  minRoi,
  maxRoi,
  stepRoi,
  calculate,
  handleLoanAmountChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
  getLoanAmountScale,
  getLoanAmountInverseScale,
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
        hideSelectionButtons={isMobile}
        label={labels[loanCalculatorType].loanAmount}
        placeholder={labels[loanCalculatorType].loanAmountPlaceholder}
        isPrice={true}
        handleChange={handleLoanAmountChange}
        isActiveShortcutButton={isActiveLoanAmountButton}
        selectShortcutButton={selectLoanAmount}
        getScale={getLoanAmountScale}
        getInverseScale={getLoanAmountInverseScale}
        step={stepAmount}
        min={minAmount}
        max={maxAmount}
      />

      <InputElement
        value={roi}
        buttonsData={defaultLoanInterestRates}
        hideSelectionButtons={isMobile}
        label={labels[loanCalculatorType].roi}
        placeholder={labels[loanCalculatorType].roiPlaceholder}
        handleChange={handleROIChange}
        isActiveShortcutButton={isActiveROIButton}
        selectShortcutButton={selectROI}
        isROI
        step={stepRoi}
        min={minRoi}
        max={maxRoi / 4}
      />

      <TenureInputElement
        tenure={tenure}
        hideSelectionButtons={isMobile}
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

      <PrepaymentInputElement />

      {isMobile && (
        <LargeButton onClick={calculate} disabled={!isValidForm} centered>
          CALCULATE
        </LargeButton>
      )}
    </Section>
  );
};

export default CommonLoanCalculatorInput;
