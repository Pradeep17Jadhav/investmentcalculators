"use client";

import { useIncomeTax } from "@/hooks/IncomeTax/useIncomeTax";
import { IncomeTaxConfig } from "@/types/ConfigTypes";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import IncomeTaxSummary from "../IncomeTaxSummary/IncomeTaxSummary";
import IncomeTaxInput from "../IncomeTaxInput/IncomeTaxInput";
import TwoColumnContainer from "../../Common/TwoColumnContainer/TwoColumnContainer";

type Props = {
  incomeTaxConfig: IncomeTaxConfig;
};

const IncomeTaxCalculator = ({ incomeTaxConfig }: Props) => {
  const { budgets } = incomeTaxConfig;
  const [budgetIndex, setBudgetIndex] = useState(0);

  const {
    income,
    toggleStdDeduction,
    getTaxCalculationSummary,
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

  const incomeTaxInput = useMemo(
    () => (
      <IncomeTaxInput
        handleIncomeChange={handleIncomeChange}
        onBudgetSelectionChange={onBudgetSelectionChange}
        toggleStdDeduction={toggleStdDeduction}
        budgets={budgets}
        standardDeduction={standardDeduction}
        income={income}
        budgetIndex={budgetIndex}
      />
    ),
    [
      budgetIndex,
      budgets,
      handleIncomeChange,
      income,
      onBudgetSelectionChange,
      standardDeduction,
      toggleStdDeduction,
    ]
  );

  const incomeTaxSummary = useMemo(
    () => (
      <IncomeTaxSummary
        income={income}
        budget={budgets[budgetIndex]}
        getTaxCalculationSummary={getTaxCalculationSummary}
      />
    ),
    [budgetIndex, budgets, getTaxCalculationSummary, income]
  );

  return (
    <TwoColumnContainer
      leftColumn={incomeTaxInput}
      rightColumn={incomeTaxSummary}
    ></TwoColumnContainer>
  );
};

export default IncomeTaxCalculator;
