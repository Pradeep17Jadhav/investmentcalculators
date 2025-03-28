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
    expectedReturns,
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

  const input = useMemo(
    () => (
      <CommonCalculatorInput
        isValidForm={isValidForm}
        calculatorType={calculatorType}
        handleInvestmentChange={handleInvestmentChange}
        handleROIChange={handleROIChange}
        handleTenureYearsChange={handleTenureYearsChange}
        handleTenureMonthsChange={handleTenureMonthsChange}
        investment={investment}
        expectedReturns={expectedReturns}
        tenure={tenure}
        onCalculate={handleCalculateBtnClick}
      />
    ),
    [
      calculatorType,
      isValidForm,
      investment,
      expectedReturns,
      tenure,
      handleInvestmentChange,
      handleROIChange,
      handleCalculateBtnClick,
      handleTenureYearsChange,
      handleTenureMonthsChange,
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
