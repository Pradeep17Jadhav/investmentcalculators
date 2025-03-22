"use client";

import { ChangeEvent, useCallback } from "react";
import Section from "@/components/Section/Section";
import { Budget } from "@/types/ConfigTypes";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import InputElement from "@/components/Common/InputElement/InputElement";
import { defaultIncome } from "./constants";

type Props = {
  handleIncomeChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    income?: string
  ) => void;
  onBudgetSelectionChange: (event: SelectChangeEvent) => void;
  toggleStdDeduction: () => void;
  budgets: Budget[];
  standardDeduction: number;
  income: number;
  budgetIndex: number;
};

const IncomeTaxInput = ({
  handleIncomeChange,
  onBudgetSelectionChange,
  toggleStdDeduction,
  budgets,
  standardDeduction,
  income,
  budgetIndex,
}: Props) => {
  const isActiveIncomeButton = useCallback(
    (selectedIncome: number) => selectedIncome === income,
    [income]
  );

  const selectIncome = useCallback(
    (income: number) => () => handleIncomeChange(undefined, income.toString()),
    [handleIncomeChange]
  );

  return (
    <Section title="Income Details">
      <FormControl margin="normal" fullWidth>
        <InputLabel>Year Of Taxation</InputLabel>
        <Select
          value={budgetIndex.toString()}
          label="Year Of Taxation"
          onChange={onBudgetSelectionChange}
        >
          {budgets.map((budget, index) => (
            <MenuItem key={budget.assessmentYear} value={index}>
              {`Financial Year ${budget.financialYear} (AY ${budget.assessmentYear})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl margin="normal" fullWidth sx={{ mb: 3 }}>
        <InputLabel>Tax Regime</InputLabel>
        {budgets.map((budget) => (
          <Select key={budget.regime} value={budget.regime} label="Tax Regime">
            <MenuItem value={budget.regime}>
              {`${budget.regime} Tax Regime`}
            </MenuItem>
          </Select>
        ))}
      </FormControl>

      <InputElement
        value={income}
        buttonsData={defaultIncome}
        label="Annual income"
        placeholder="25,00,000"
        isPrice={true}
        handleChange={handleIncomeChange}
        isActiveShortcutButton={isActiveIncomeButton}
        selectShortcutButton={selectIncome}
      />

      <FormControlLabel
        sx={{ mb: 2 }}
        control={
          <Checkbox
            checked={!!standardDeduction}
            onChange={toggleStdDeduction}
          />
        }
        label="Use standard deduction (salaried employees)"
      />
    </Section>
  );
};

export default IncomeTaxInput;
