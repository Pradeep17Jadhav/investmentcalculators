"use client";

import { useMemo } from "react";
import LumpsumCalculatorInput from "../LumpsumCalculatorInput/LumpsumCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import LumpsumCalculatorSummary from "../LumpsumCalculatorSummary/LumpsumCalculatorSummary";
import { useLumpsum } from "@/hooks/Lumpsum/useLumpsum";

const LumpsumCalculator = () => {
  const {
    isValidForm,
    lumpsumInvestment,
    expectedReturns,
    investmentPeriod,
    profit,
    maturityValue,
    timesMultiplied,
    handleInvestmentChange,
    handleExpectedReturnsChange,
    handleInvestmentPeriodChange,
  } = useLumpsum();

  const fixedDepositInput = useMemo(
    () => (
      <LumpsumCalculatorInput
        handleInvestmentChange={handleInvestmentChange}
        handleExpectedReturnsChange={handleExpectedReturnsChange}
        handleInvestmentPeriodChange={handleInvestmentPeriodChange}
        lumpsumInvestment={lumpsumInvestment}
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
      lumpsumInvestment,
    ]
  );

  const fixedDepositSummary = useMemo(
    () => (
      <LumpsumCalculatorSummary
        isValidForm={isValidForm}
        lumpsumInvestment={lumpsumInvestment}
        profit={profit}
        maturityValue={maturityValue}
        timesMultiplied={timesMultiplied}
      />
    ),
    [isValidForm, maturityValue, lumpsumInvestment, profit, timesMultiplied]
  );

  return (
    <TwoColumnContainer
      leftColumn={fixedDepositInput}
      rightColumn={fixedDepositSummary}
    ></TwoColumnContainer>
  );
};

export default LumpsumCalculator;
