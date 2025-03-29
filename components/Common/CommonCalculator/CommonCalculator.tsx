"use client";

import { useCallback, useMemo, useRef } from "react";
import CommonCalculatorInput from "../CommonCalculatorInput/CommonCalculatorInput";
import TwoColumnContainer from "@/components/Common/TwoColumnContainer/TwoColumnContainer";
import { useCalculator } from "@/hooks/Common/useCalculator";
import { CalculatorType } from "@/types/ConfigTypes";
import { LumpsumCalculatorSummaryProps } from "@/components/Lumpsum/LumpsumCalculatorSummary";
import { SIPCalculatorSummaryProps } from "@/components/SIP/SIPCalculatorSummary";
import { FDCalculatorSummaryProps } from "@/components/FD/FDCalculatorSummary";
import { RDCalculatorSummaryProps } from "@/components/RD/RDCalculatorSummary";
import {
  INVESTMENT_STEP,
  MAX_INVESTMENT,
  MAX_MONTHLY_INVESTMENT,
  MAX_ROI,
  MIN_INVESTMENT,
  MIN_MONTHLY_INVESTMENT,
  MIN_ROI,
  MONTHLY_INVESTMENT_STEP,
  ROI_STEP,
} from "@/constants/calculator";

type Props = {
  calculatorType: CalculatorType;
  Summary: React.ComponentType<
    LumpsumCalculatorSummaryProps &
      SIPCalculatorSummaryProps &
      RDCalculatorSummaryProps &
      FDCalculatorSummaryProps
  >;
};

const CommonCalculator = ({ calculatorType, Summary }: Props) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const {
    isValidForm,
    resultsReady,
    investment,
    yearlyInvestment,
    totalInvestment,
    roi,
    tenure,
    profit,
    maturityValue,
    timesMultiplied,
    calculate,
    handleInvestmentChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  } = useCalculator({ calculatorType });

  const handleCalculateBtnClick = useCallback(() => {
    calculate();
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [calculate]);

  const minAmount =
    calculatorType === CalculatorType.SIP ||
    calculatorType === CalculatorType.RD
      ? MIN_MONTHLY_INVESTMENT
      : MIN_INVESTMENT;
  const maxAmount =
    calculatorType === CalculatorType.SIP ||
    calculatorType === CalculatorType.RD
      ? MAX_MONTHLY_INVESTMENT
      : MAX_INVESTMENT;
  const stepAmount =
    calculatorType === CalculatorType.SIP ||
    calculatorType === CalculatorType.RD
      ? MONTHLY_INVESTMENT_STEP
      : INVESTMENT_STEP;

  const input = useMemo(
    () => (
      <CommonCalculatorInput
        isValidForm={isValidForm}
        calculatorType={calculatorType}
        investment={investment}
        roi={roi}
        tenure={tenure}
        minAmount={minAmount}
        maxAmount={maxAmount}
        minRoi={MIN_ROI}
        maxRoi={MAX_ROI}
        stepAmount={stepAmount}
        stepRoi={ROI_STEP}
        handleInvestmentChange={handleInvestmentChange}
        handleROIChange={handleROIChange}
        handleTenureYearsChange={handleTenureYearsChange}
        handleTenureMonthsChange={handleTenureMonthsChange}
        onCalculate={handleCalculateBtnClick}
      />
    ),
    [
      isValidForm,
      calculatorType,
      investment,
      roi,
      tenure,
      minAmount,
      maxAmount,
      stepAmount,
      handleInvestmentChange,
      handleROIChange,
      handleTenureYearsChange,
      handleTenureMonthsChange,
      handleCalculateBtnClick,
    ]
  );

  return (
    <TwoColumnContainer
      leftColumn={input}
      rightColumn={
        <Summary
          isValidForm={isValidForm}
          resultsReady={resultsReady}
          profit={profit}
          maturityValue={maturityValue}
          timesMultiplied={timesMultiplied}
          investment={investment}
          monthlyInvestment={investment}
          yearlyInvestment={yearlyInvestment}
          totalInvestment={totalInvestment}
          ref={resultRef}
        />
      }
    ></TwoColumnContainer>
  );
};

export default CommonCalculator;
