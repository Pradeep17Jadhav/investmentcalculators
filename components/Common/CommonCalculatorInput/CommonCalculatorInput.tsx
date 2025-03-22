"use client";

import { ChangeEvent, useMemo } from "react";
import Section from "@/components/Section/Section";
import { CalculatorType, Tenure } from "@/types/ConfigTypes";
import InputElement from "../InputElement/InputElement";
import {
  commonCalculatorLabels,
  defaultInvestmentAmount,
  defaultInvestmentReturnsRate,
  defaultInvestmentTenureMonths,
  defaultInvestmentTenureYears,
  defaultOneTimeAmount,
} from "./constants";
import { useLoanSelection } from "@/hooks/Loan/useLoanSelection";
import TenureInputElement from "../TenureInputElement/TenureInputElement";

type Props = {
  handleInvestmentChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    investment?: string
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
  calculatorType: CalculatorType;
  investment: number;
  expectedReturns: number;
  tenure: Tenure;
};

const CommonCalculatorInput = ({
  handleInvestmentChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
  calculatorType,
  investment,
  expectedReturns,
  tenure: tenure,
}: Props) => {
  const {
    isActiveInvestmentButton,
    isActiveYearButton,
    isActiveMonthButton,
    isActiveROIButton,
    selectInvestment,
    selectYears,
    selectMonths,
    selectROI,
  } = useLoanSelection({
    investment,
    tenure,
    roi: expectedReturns.toString(),
    handleInvestmentChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  });

  const defaultInvestmentShortcutData = useMemo(() => {
    switch (calculatorType) {
      case CalculatorType.SIP:
        return defaultInvestmentAmount;
      case CalculatorType.FD:
        return defaultOneTimeAmount;
      case CalculatorType.RD:
        return defaultInvestmentAmount;
      case CalculatorType.Lumpsum:
        return defaultOneTimeAmount;
    }
  }, [calculatorType]);

  return (
    <Section title={commonCalculatorLabels[calculatorType].title}>
      <InputElement
        value={investment}
        buttonsData={defaultInvestmentShortcutData}
        label={commonCalculatorLabels[calculatorType].investment}
        placeholder={
          commonCalculatorLabels[calculatorType].investmentPlaceholder
        }
        isPrice={true}
        handleChange={handleInvestmentChange}
        isActiveShortcutButton={isActiveInvestmentButton}
        selectShortcutButton={selectInvestment}
      />

      <InputElement
        value={expectedReturns}
        buttonsData={defaultInvestmentReturnsRate}
        label={commonCalculatorLabels[calculatorType].returns}
        placeholder={commonCalculatorLabels[calculatorType].roiPlaceholder}
        handleChange={handleROIChange}
        isActiveShortcutButton={isActiveROIButton}
        selectShortcutButton={selectROI}
        isROI={true}
      />

      <TenureInputElement
        tenure={tenure}
        label={commonCalculatorLabels[calculatorType].tenure}
        placeholderYears={
          commonCalculatorLabels[calculatorType].tenureYearsPlaceholder
        }
        placeholderMonths={
          commonCalculatorLabels[calculatorType].tenureMonthsPlaceholder
        }
        yearsData={defaultInvestmentTenureYears}
        monthsData={defaultInvestmentTenureMonths}
        handleYearChange={handleTenureYearsChange}
        handleMonthChange={handleTenureMonthsChange}
        isActiveYearButton={isActiveYearButton}
        isActiveMonthButton={isActiveMonthButton}
        selectYears={selectYears}
        selectMonths={selectMonths}
      />
    </Section>
  );
};

export default CommonCalculatorInput;
