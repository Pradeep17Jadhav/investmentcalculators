"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import { Budget } from "@/types/ConfigTypes";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import styles from "./IncomeTaxInput.module.css";
import { ToWords } from "to-words";

type Props = {
  handleIncomeChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  const toWords = new ToWords();

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
      <FormControl margin="normal" fullWidth>
        <InputLabel>Tax Regime</InputLabel>
        {budgets.map((budget) => (
          <Select
            key={budget.regime}
            value={budget.regime}
            label="Tax Regime"
            onChange={onBudgetSelectionChange}
          >
            <MenuItem value={budget.regime}>
              {`${budget.regime} Tax Regime`}
            </MenuItem>
          </Select>
        ))}
      </FormControl>
      <TextField
        placeholder="Annual income"
        variant="outlined"
        value={income ? formatPrice(income) : ""}
        onChange={handleIncomeChange}
        fullWidth
        margin="normal"
      />
      {!!income && (
        <div className={styles.caption}>{toWords.convert(income)}</div>
      )}
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
