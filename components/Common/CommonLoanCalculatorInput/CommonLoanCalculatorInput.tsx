"use client";

import { ChangeEvent } from "react";
import { ToWords } from "to-words";
import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import { InputAdornment, TextField } from "@mui/material";
import { LoanCalculatorType, InvestmentPeriod } from "@/types/ConfigTypes";

import styles from "./CommonLoanCalculatorInput.module.css";

type LoanCalculatorInputLabels = {
  [key in LoanCalculatorType]: {
    title: string;
    loanAmount: string;
    roi: string;
    tenure: string;
  };
};

type Props = {
  handleLoanAmountChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleROIChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleTenureChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  loanCalculatorType: LoanCalculatorType;
  loanAmount: number;
  roi: string;
  tenure: InvestmentPeriod;
};

const CommonLoanCalculatorInput = ({
  loanCalculatorType,
  handleLoanAmountChange,
  handleROIChange,
  handleTenureChange,
  loanAmount,
  roi,
  tenure,
}: Props) => {
  const toWords = new ToWords();

  const labels: LoanCalculatorInputLabels = {
    [LoanCalculatorType.HOME]: {
      title: "Loan Details",
      loanAmount: "Loan Amount",
      roi: "Rate of Interest",
      tenure: "Loan Tenure",
    },
    [LoanCalculatorType.CAR]: {
      title: "Car Loan Details",
      loanAmount: "Loan Amount",
      roi: "Rate of Interest",
      tenure: "Loan Tenure",
    },
    [LoanCalculatorType.PERSONAL]: {
      title: "Personal Loan Details",
      loanAmount: "Loan Amount",
      roi: "Rate of Interest",
      tenure: "Loan Tenure",
    },
  };

  return (
    <Section title={labels[loanCalculatorType].title}>
      <TextField
        placeholder={labels[loanCalculatorType].loanAmount}
        variant="outlined"
        value={loanAmount ? formatPrice(loanAmount) : ""}
        onChange={handleLoanAmountChange}
        fullWidth
        margin="normal"
      />
      {!!loanAmount && (
        <div className={styles.caption}>{toWords.convert(loanAmount)}</div>
      )}
      <TextField
        placeholder={labels[loanCalculatorType].roi}
        variant="outlined"
        value={parseFloat(roi) ? roi : ""}
        onChange={handleROIChange}
        fullWidth
        margin="normal"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          },
        }}
      />
      <TextField
        placeholder={labels[loanCalculatorType].tenure}
        variant="outlined"
        type="number"
        value={tenure.months || ""}
        onChange={handleTenureChange}
        fullWidth
        margin="normal"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">months</InputAdornment>
            ),
          },
        }}
      />
    </Section>
  );
};

export default CommonLoanCalculatorInput;
