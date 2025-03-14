"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { ToWords } from "to-words";

import styles from "./CommonCalculatorInput.module.css";
import { CalculatorType } from "@/types/ConfigTypes";

type CalculatorInputLabels = {
  [key in CalculatorType]: {
    title: string;
    investment: string;
    returns: string;
    tenure: string;
  };
};

type Props = {
  handleInvestmentChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleExpectedReturnsChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleInvestmentPeriodChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  calculatorType: CalculatorType;
  investment: number;
  expectedReturns: number;
  investmentPeriod: number;
};

const CommonCalculatorInput = ({
  handleInvestmentChange,
  handleExpectedReturnsChange,
  handleInvestmentPeriodChange,
  calculatorType,
  investment,
  expectedReturns,
  investmentPeriod,
}: Props) => {
  const toWords = new ToWords();

  const labels: CalculatorInputLabels = {
    [CalculatorType.SIP]: {
      title: "SIP Details",
      investment: "Monthly Investment",
      returns: "Expected Returns",
      tenure: "Investment Period",
    },
    [CalculatorType.FD]: {
      title: "FD Details",
      investment: "Saving Amount",
      returns: "Expected Returns",
      tenure: "Investment Period",
    },
    [CalculatorType.RD]: {
      title: "RD Details",
      investment: "Monthly Savings in RD",
      returns: "Expected Returns",
      tenure: "Investment Period",
    },
    [CalculatorType.Lumpsum]: {
      title: "Lumpsum Investment Details",
      investment: "Investment Amount",
      returns: "Expected Returns",
      tenure: "Investment Period",
    },
  };

  return (
    <Section title={labels[calculatorType].title}>
      <TextField
        placeholder={labels[calculatorType].investment}
        variant="outlined"
        value={investment ? formatPrice(investment) : ""}
        onChange={handleInvestmentChange}
        fullWidth
        margin="normal"
      />
      {!!investment && (
        <div className={styles.caption}>
          {toWords.convert(investment)}
        </div>
      )}
      <TextField
        placeholder={labels[calculatorType].returns}
        type="number"
        variant="outlined"
        value={expectedReturns || ""}
        onChange={handleExpectedReturnsChange}
        fullWidth
        margin="normal"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          },
        }}
      />
      <TextField
        placeholder={labels[calculatorType].tenure}
        variant="outlined"
        type="number"
        value={investmentPeriod || ""}
        onChange={handleInvestmentPeriodChange}
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

export default CommonCalculatorInput;
