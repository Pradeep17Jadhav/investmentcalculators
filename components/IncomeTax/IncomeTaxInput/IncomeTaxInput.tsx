"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import { useIncomeTax } from "@/hooks/IncomeTax/useIncomeTax";
import { Config } from "@/types/ConfigTypes";
import {
  Button,
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
import { useCallback, useRef, useState } from "react";
import styles from "./IncomeTaxInput.module.css";
import IncomeTaxSummary from "../IncomeTaxSummary/IncomeTaxSummary";

type Props = {
  config: Config;
};

const IncomeTaxInput = ({ config }: Props) => {
  const { incomeTax } = config;
  const { budgets } = incomeTax;

  const [budgetIndex, setBudgetIndex] = useState(0);
  const taxLiabilityRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const {
    income,
    toggleStdDeduction,
    getTaxCalculationSummary,
    onCalculate,
    onIncomeChange,
  } = useIncomeTax(budgets[budgetIndex]);

  const { standardDeduction } = getTaxCalculationSummary();

  const onBudgetSelectionChange = useCallback((event: SelectChangeEvent) => {
    setBudgetIndex(parseInt(event.target.value));
  }, []);

  const handleCalculate = useCallback(() => {
    onCalculate();
    taxLiabilityRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [onCalculate]);

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
              onChange={onIncomeChange}
              fullWidth
              margin="normal"
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
            <Button
              className={styles.primaryButton}
              type="submit"
              variant="contained"
              onClick={handleCalculate}
              fullWidth
            >
              Calculate
            </Button>
          </Section>
        </Grid>
        <Grid className={styles.rightColumn} item xs={12} md={6}>
          <IncomeTaxSummary
            income={income}
            budget={budgets[budgetIndex]}
            taxLiabilityRef={taxLiabilityRef}
            getTaxCalculationSummary={getTaxCalculationSummary}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default IncomeTaxInput;
