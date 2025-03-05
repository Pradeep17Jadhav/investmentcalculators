"use client";

import { useMemo } from "react";
import LumpsumCalculatorInput from "../LumpsumCalculatorInput/LumpsumCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import LumpsumCalculatorSummary from "../LumpsumCalculatorSummary/LumpsumCalculatorSummary";
import { useSIP } from "@/hooks/sip/useSIP";

const LumpsumCalculator = () => {
  const {
    isValidForm,
    monthlyInvestment,
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
  } = useSIP();

  const fixedDepositInput = useMemo(
    () => (
      <LumpsumCalculatorInput
        handleInvestmentChange={handleInvestmentChange}
        handleExpectedReturnsChange={handleExpectedReturnsChange}
        handleInvestmentPeriodChange={handleInvestmentPeriodChange}
        monthlyInvestment={monthlyInvestment}
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
      monthlyInvestment,
    ]
  );

  const fixedDepositSummary = useMemo(
    () => (
      <LumpsumCalculatorSummary
        isValidForm={isValidForm}
        monthlyInvestment={monthlyInvestment}
        yearlyInvestment={yearlyInvestment}
        totalInvestment={totalInvestment}
        profit={profit}
        maturityValue={maturityValue}
        timesMultiplied={timesMultiplied}
      />
    ),
    [
      isValidForm,
      maturityValue,
      monthlyInvestment,
      profit,
      timesMultiplied,
      yearlyInvestment,
      totalInvestment,
    ]
  );

  return (
    <TwoColumnContainer
      leftColumn={fixedDepositInput}
      rightColumn={fixedDepositSummary}
    ></TwoColumnContainer>
  );
};

export default LumpsumCalculator;
