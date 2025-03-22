"use client";

import { useMemo } from "react";
import CommonCalculatorInput from "../CommonCalculatorInput/CommonCalculatorInput";
import TwoColumnContainer from "@/components/Common/TwoColumnContainer/TwoColumnContainer";
import { useCalculator } from "@/hooks/Common/useCalculator";
import { CalculatorType } from "@/types/ConfigTypes";
import { LumpsumCalculatorProps } from "@/components/Lumpsum/LumpsumCalculatorSummary";
import { SIPCalculatorSummaryProps } from "@/components/SIP/SIPCalculatorSummary";

type Props = {
  calculatorType: CalculatorType;
  Summary: React.ComponentType<
    LumpsumCalculatorProps & SIPCalculatorSummaryProps
  >;
};

const CommonCalculator = ({ calculatorType, Summary }: Props) => {
  const {
    isValidForm,
    investment,
    yearlyInvestment,
    totalInvestment,
    expectedReturns,
    tenure,
    profit,
    maturityValue,
    timesMultiplied,
    handleInvestmentChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  } = useCalculator({ calculatorType });

  const input = useMemo(
    () => (
      <CommonCalculatorInput
        calculatorType={calculatorType}
        handleInvestmentChange={handleInvestmentChange}
        handleROIChange={handleROIChange}
        handleTenureYearsChange={handleTenureYearsChange}
        handleTenureMonthsChange={handleTenureMonthsChange}
        investment={investment}
        expectedReturns={expectedReturns}
        tenure={tenure}
      />
    ),
    [
      calculatorType,
      handleInvestmentChange,
      handleROIChange,
      handleTenureYearsChange,
      handleTenureMonthsChange,
      investment,
      expectedReturns,
      tenure,
    ]
  );

  return (
    <TwoColumnContainer
      leftColumn={input}
      rightColumn={
        <Summary
          isValidForm={isValidForm}
          profit={profit}
          maturityValue={maturityValue}
          timesMultiplied={timesMultiplied}
          investment={investment}
          monthlyInvestment={investment}
          yearlyInvestment={yearlyInvestment}
          totalInvestment={totalInvestment}
        />
      }
    ></TwoColumnContainer>
  );
};

export default CommonCalculator;
