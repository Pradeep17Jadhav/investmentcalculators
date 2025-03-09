"use client";

import { useMemo } from "react";
import LumpsumCalculatorInput from "../LumpsumCalculatorInput/LumpsumCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import LumpsumCalculatorSummary from "../LumpsumCalculatorSummary/LumpsumCalculatorSummary";
import { useCalculator } from "@/hooks/Common/useCalculator";
import { CalculatorType } from "@/types/ConfigTypes";

const LumpsumCalculator = () => {
  const {
    isValidForm,
    investment,
    expectedReturns,
    investmentPeriod,
    profit,
    maturityValue,
    timesMultiplied,
    handleInvestmentChange,
    handleExpectedReturnsChange,
    handleInvestmentPeriodChange,
  } = useCalculator({ calculatorType: CalculatorType.Lumpsum });

  const fixedDepositInput = useMemo(
    () => (
      <LumpsumCalculatorInput
        handleInvestmentChange={handleInvestmentChange}
        handleExpectedReturnsChange={handleExpectedReturnsChange}
        handleInvestmentPeriodChange={handleInvestmentPeriodChange}
        lumpsumInvestment={investment}
        expectedReturns={expectedReturns}
        investmentPeriod={investmentPeriod}
      />
    ),
    [
      expectedReturns,
      handleExpectedReturnsChange,
      handleInvestmentChange,
      handleInvestmentPeriodChange,
      investmentPeriod,
      investment,
    ]
  );

  const fixedDepositSummary = useMemo(
    () => (
      <LumpsumCalculatorSummary
        isValidForm={isValidForm}
        lumpsumInvestment={investment}
        profit={profit}
        maturityValue={maturityValue}
        timesMultiplied={timesMultiplied}
      />
    ),
    [isValidForm, maturityValue, investment, profit, timesMultiplied]
  );

  return (
    <TwoColumnContainer
      leftColumn={fixedDepositInput}
      rightColumn={fixedDepositSummary}
    ></TwoColumnContainer>
  );
};

export default LumpsumCalculator;
