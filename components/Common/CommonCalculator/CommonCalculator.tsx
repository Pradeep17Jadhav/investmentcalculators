"use client";

import { useMemo } from "react";
import CommonCalculatorInput from "../CommonCalculatorInput/CommonCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
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
    investmentPeriod,
    profit,
    maturityValue,
    timesMultiplied,
    handleInvestmentChange,
    handleExpectedReturnsChange,
    handleInvestmentPeriodChange,
  } = useCalculator({ calculatorType });

  const input = useMemo(
    () => (
      <CommonCalculatorInput
        calculatorType={calculatorType}
        handleInvestmentChange={handleInvestmentChange}
        handleExpectedReturnsChange={handleExpectedReturnsChange}
        handleInvestmentPeriodChange={handleInvestmentPeriodChange}
        investment={investment}
        expectedReturns={expectedReturns}
        investmentPeriod={investmentPeriod}
      />
    ),
    [
      calculatorType,
      expectedReturns,
      handleExpectedReturnsChange,
      handleInvestmentChange,
      handleInvestmentPeriodChange,
      investmentPeriod,
      investment,
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
