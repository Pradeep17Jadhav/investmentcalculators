"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import { useIncomeTax } from "@/hooks/IncomeTax/useIncomeTax";
import { IncomeTaxConfig } from "@/types/ConfigTypes";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ChangeEvent, useCallback, useState } from "react";
import styles from "./IncomeTaxInput.module.css";
import IncomeTaxSummary from "../IncomeTaxSummary/IncomeTaxSummary";
import { ToWords } from "to-words";

type Props = {
  incomeTaxConfig: IncomeTaxConfig;
};

const IncomeTaxInput = ({ incomeTaxConfig }: Props) => {
  const { budgets } = incomeTaxConfig;

  const [budgetIndex, setBudgetIndex] = useState(0);
  const toWords = new ToWords();

  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
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
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newIncome = e.target.value || "0";
      onIncomeChange(newIncome);
    },
    [onIncomeChange]
  );

  return (
    <div className={styles.incometaxColumns}>
      <Grid
        container
        justifyContent="center"
        alignItems={isMdDown ? "center" : "stretch"}
        spacing={4}
      >
        <Grid className={styles.leftColumn} item xs={12} md={6}>
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
            {!!income && <div className={styles.caption}>{toWords.convert(income)}</div>}
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
        </Grid>
        <Grid className={styles.rightColumn} item xs={12} md={6}>
          <IncomeTaxSummary
            income={income}
            budget={budgets[budgetIndex]}
            getTaxCalculationSummary={getTaxCalculationSummary}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default IncomeTaxInput;
