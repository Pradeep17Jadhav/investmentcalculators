"use client";

import { useMemo } from "react";
import SIPCalculatorInput from "../SIPCalculatorInput/SIPCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import SIPCalculatorSummary from "../SIPCalculatorSummary/SIPCalculatorSummary";
import { useCalculator } from "@/hooks/Common/useCalculator";
import { CalculatorType } from "@/types/ConfigTypes";

const SIPCalculator = () => {
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
  } = useCalculator({ calculatorType: CalculatorType.SIP });

  const fixedDepositInput = useMemo(
    () => (
      <SIPCalculatorInput
        handleInvestmentChange={handleInvestmentChange}
        handleExpectedReturnsChange={handleExpectedReturnsChange}
        handleInvestmentPeriodChange={handleInvestmentPeriodChange}
        monthlyInvestment={investment}
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
      <SIPCalculatorSummary
        isValidForm={isValidForm}
        monthlyInvestment={investment}
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
      investment,
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
