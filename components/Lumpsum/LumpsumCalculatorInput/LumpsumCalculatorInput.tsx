"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { ToWords } from "to-words";

import styles from "./LumpsumCalculatorInput.module.css";

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
  lumpsumInvestment: number;
  expectedReturns: number;
  investmentPeriod: number;
};

const LumpsumCalculatorInput = ({
  handleInvestmentChange,
  handleExpectedReturnsChange,
  handleInvestmentPeriodChange,
  lumpsumInvestment,
  expectedReturns,
  investmentPeriod,
}: Props) => {
  const toWords = new ToWords();

  return (
    <Section title="Investment Details">
      <TextField
        placeholder="Lumpsum Investment"
        variant="outlined"
        value={lumpsumInvestment ? formatPrice(lumpsumInvestment) : ""}
        onChange={handleInvestmentChange}
        fullWidth
        margin="normal"
      />
      {!!lumpsumInvestment && (
        <div className={styles.caption}>
          {toWords.convert(lumpsumInvestment)}
        </div>
      )}
      <TextField
        placeholder="Expected Returns"
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
        placeholder="Investment Period"
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

export default LumpsumCalculatorInput;
