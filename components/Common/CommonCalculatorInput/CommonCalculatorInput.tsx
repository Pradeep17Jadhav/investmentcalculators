"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Section from "@/components/Section/Section";
import { CalculatorType, Tenure } from "@/types/ConfigTypes";
import InputElement from "../InputElement/InputElement";
import {
  commonCalculatorLabels,
  defaultInvestmentTenureMonths,
  defaultInvestmentTenureYears,
} from "./constants";
import { useAmountSelection } from "@/hooks/Loan/useLoanSelection";
import TenureInputElement from "../TenureInputElement/TenureInputElement";
import {
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import {
  getInitialInvestmentShortcutData,
  getInvestmentShortcutData,
  getRoiShortcutData,
} from "./helpers";

type Props = {
  calculatorType: CalculatorType;
  isValidForm: boolean;
  haveInitialInvestment: boolean;
  initialInvestment: number;
  investment: number;
  roi: string;
  tenure: Tenure;
  minInitialAmount: number;
  maxInitialAmount: number;
  stepInitialAmount: number;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  minRoi: number;
  maxRoi: number;
  stepRoi: number;
  setHaveInitialInvestment: Dispatch<SetStateAction<boolean>>;
  handleInitialInvestmentChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    initialInvestment?: string
  ) => void;
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
  getInitialInvestmentScale?: (value: number) => number;
  getInitialInvestmentInverseScale?: (value: number) => number;
  getInvestmentScale?: (value: number) => number;
  getInvestmentInverseScale?: (value: number) => number;
};

const CommonCalculatorInput = ({
  isValidForm,
  calculatorType,
  haveInitialInvestment,
  initialInvestment,
  investment,
  roi,
  tenure,
  minInitialAmount,
  maxInitialAmount,
  stepInitialAmount,
  minAmount,
  maxAmount,
  stepAmount,
  minRoi,
  maxRoi,
  stepRoi,
  setHaveInitialInvestment,
  handleInitialInvestmentChange,
  handleInvestmentChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
  onCalculate,
  getInitialInvestmentScale,
  getInitialInvestmentInverseScale,
  getInvestmentScale,
  getInvestmentInverseScale,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    isActiveInitialInvestmentButton,
    isActiveInvestmentButton,
    isActiveYearButton,
    isActiveMonthButton,
    isActiveROIButton,
    selectInvestment,
    selectInitialInvestment,
    selectYears,
    selectMonths,
    selectROI,
  } = useAmountSelection({
    initialInvestment,
    investment,
    tenure,
    roi: roi.toString(),
    handleInitialInvestmentChange,
    handleInvestmentChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  });

  const handleHaveInitialInvestmentToggle = useCallback(
    () => setHaveInitialInvestment((has) => !has),
    [setHaveInitialInvestment]
  );

  const initialInvestmentShortcutData = useMemo(
    () => getInitialInvestmentShortcutData(),
    []
  );

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
        getScale={getInvestmentScale}
        getInverseScale={getInvestmentInverseScale}
        step={stepAmount}
        min={minAmount}
        max={maxAmount}
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

      {calculatorType === CalculatorType.SIP && (
        <FormControlLabel
          control={
            <Checkbox
              checked={haveInitialInvestment}
              onChange={handleHaveInitialInvestmentToggle}
            />
          }
          label="I have initial investment"
        />
      )}

      {haveInitialInvestment && (
        <InputElement
          value={initialInvestment}
          buttonsData={initialInvestmentShortcutData}
          label={commonCalculatorLabels[calculatorType].initialInvestment}
          placeholder={
            commonCalculatorLabels[calculatorType].initialInvestmentPlaceholder
          }
          isPrice={true}
          handleChange={handleInitialInvestmentChange}
          isActiveShortcutButton={isActiveInitialInvestmentButton}
          selectShortcutButton={selectInitialInvestment}
          getScale={getInitialInvestmentScale}
          getInverseScale={getInitialInvestmentInverseScale}
          step={stepInitialAmount}
          min={minInitialAmount}
          max={maxInitialAmount}
        />
      )}

      {isMobile && (
        <LargeButton onClick={onCalculate} disabled={!isValidForm} centered>
          CALCULATE
        </LargeButton>
      )}
    </Section>
  );
};

export default CommonCalculatorInput;
