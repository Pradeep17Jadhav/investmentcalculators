"use client";

import { useMemo } from "react";
import SIPCalculatorInput from "../SIPCalculatorInput/SIPCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import SIPCalculatorSummary from "../SIPCalculatorSummary/SIPCalculatorSummary";
import { useSIP } from "@/hooks/sip/useSIP";

const SIPCalculator = () => {
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
      <SIPCalculatorInput
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
      <SIPCalculatorSummary
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

export default SIPCalculator;
