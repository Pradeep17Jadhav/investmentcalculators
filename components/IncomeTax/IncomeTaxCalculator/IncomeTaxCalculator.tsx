"use client";

import { useIncomeTax } from "@/hooks/IncomeTax/useIncomeTax";
import { IncomeTaxConfig } from "@/types/ConfigTypes";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import IncomeTaxSummary from "../IncomeTaxSummary/IncomeTaxSummary";
import IncomeTaxInput from "../IncomeTaxInput/IncomeTaxInput";
import TwoColumnContainer from "../../Common/TwoColumnContainer/TwoColumnContainer";

type Props = {
  incomeTaxConfig: IncomeTaxConfig;
};

const IncomeTaxCalculator = ({ incomeTaxConfig }: Props) => {
  const { budgets } = incomeTaxConfig;
  const [budgetIndex, setBudgetIndex] = useState(0);
  const taxLiabilityRef = useRef<HTMLDivElement>(null);

  const {
    income,
    isValidForm,
    resultsReady,
    toggleStdDeduction,
    getTaxCalculationSummary,
    onCalculate,
    onIncomeChange,
  } = useIncomeTax(budgets[budgetIndex]);
  const { standardDeduction } = getTaxCalculationSummary();

  const onBudgetSelectionChange = useCallback((event: SelectChangeEvent) => {
    setBudgetIndex(parseInt(event.target.value));
  }, []);

  const handleIncomeChange = useCallback(
    (
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      income?: string
    ) => {
      const newIncome = e?.target.value || income || "0";
      onIncomeChange(newIncome);
    },
    [onIncomeChange]
  );

  const handleCalculateBtnClick = useCallback(() => {
    onCalculate();
    taxLiabilityRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [onCalculate]);

  const incomeTaxInput = useMemo(
    () => (
      <IncomeTaxInput
        handleIncomeChange={handleIncomeChange}
        onBudgetSelectionChange={onBudgetSelectionChange}
        toggleStdDeduction={toggleStdDeduction}
        onCalculate={handleCalculateBtnClick}
        budgets={budgets}
        standardDeduction={standardDeduction}
        income={income}
        budgetIndex={budgetIndex}
        isValidForm={isValidForm}
      />
    ),
    [
      isValidForm,
      budgetIndex,
      budgets,
      income,
      standardDeduction,
      handleIncomeChange,
      onBudgetSelectionChange,
      toggleStdDeduction,
      handleCalculateBtnClick,
    ]
  );

  const incomeTaxSummary = useMemo(
    () => (
      <IncomeTaxSummary
        income={income}
        resultsReady={resultsReady}
        budget={budgets[budgetIndex]}
        getTaxCalculationSummary={getTaxCalculationSummary}
        taxLiabilityRef={taxLiabilityRef}
      />
    ),
    [budgetIndex, budgets, getTaxCalculationSummary, income, resultsReady]
  );

  return (
    <TwoColumnContainer
      leftColumn={incomeTaxInput}
      rightColumn={incomeTaxSummary}
    ></TwoColumnContainer>
  );
};

export default IncomeTaxCalculator;
