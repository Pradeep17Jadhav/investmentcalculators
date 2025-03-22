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

type Props = {
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
  loanCalculatorType: LoanCalculatorType;
  loanAmount: number;
  roi: string;
  tenure: Tenure;
};

const CommonLoanCalculatorInput = ({
  loanCalculatorType,
  handleLoanAmountChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
  loanAmount,
  roi,
  tenure,
}: Props) => {
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
    </Section>
  );
};

export default CommonLoanCalculatorInput;
