"use client";

import { ChangeEvent, useMemo } from "react";
import Section from "@/components/Section/Section";
import { CalculatorType, Tenure } from "@/types/ConfigTypes";
import InputElement from "../InputElement/InputElement";
import {
  commonCalculatorLabels,
  defaultInvestmentTenureMonths,
  defaultInvestmentTenureYears,
} from "./constants";
import { useLoanSelection } from "@/hooks/Loan/useLoanSelection";
import TenureInputElement from "../TenureInputElement/TenureInputElement";
import { useMediaQuery, useTheme } from "@mui/material";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import { getInvestmentShortcutData, getRoiShortcutData } from "./helpers";

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
  onCalculate: () => void;
  calculatorType: CalculatorType;
  isValidForm: boolean;
  investment: number;
  roi: string;
  tenure: Tenure;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  minRoi: number;
  maxRoi: number;
  stepRoi: number;
};

const CommonCalculatorInput = ({
  handleInvestmentChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
  onCalculate,
  isValidForm,
  calculatorType,
  investment,
  roi,
  tenure,
  minAmount,
  maxAmount,
  stepAmount,
  minRoi,
  maxRoi,
  stepRoi,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    roi: roi.toString(),
    handleInvestmentChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  });

  const investmentShortcutData = useMemo(
    () => getInvestmentShortcutData(calculatorType),
    [calculatorType]
  );

  const roiShortcutData = useMemo(
    () => getRoiShortcutData(calculatorType),
    [calculatorType]
  );

  const shouldShowMonths =
    calculatorType === CalculatorType.FD ||
    calculatorType === CalculatorType.RD;

  return (
    <Section title={commonCalculatorLabels[calculatorType].title}>
      <InputElement
        value={investment}
        buttonsData={investmentShortcutData}
        label={commonCalculatorLabels[calculatorType].investment}
        placeholder={
          commonCalculatorLabels[calculatorType].investmentPlaceholder
        }
        isPrice={true}
        handleChange={handleInvestmentChange}
        isActiveShortcutButton={isActiveInvestmentButton}
        selectShortcutButton={selectInvestment}
        step={stepAmount}
        min={minAmount}
        max={maxAmount / 10}
      />
      <InputElement
        value={roi}
        buttonsData={roiShortcutData}
        label={commonCalculatorLabels[calculatorType].returns}
        placeholder={commonCalculatorLabels[calculatorType].roiPlaceholder}
        handleChange={handleROIChange}
        isActiveShortcutButton={isActiveROIButton}
        selectShortcutButton={selectROI}
        isROI={true}
        step={stepRoi}
        min={minRoi}
        max={maxRoi / 4}
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
        showMonths={shouldShowMonths}
      />

      {isMobile && (
        <LargeButton onClick={onCalculate} disabled={!isValidForm} centered>
          CALCULATE
        </LargeButton>
      )}
    </Section>
  );
};

export default CommonCalculatorInput;
