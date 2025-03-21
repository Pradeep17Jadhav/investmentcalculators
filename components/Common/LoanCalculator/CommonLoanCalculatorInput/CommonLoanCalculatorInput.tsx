"use client";

import { ChangeEvent, useCallback, useMemo } from "react";
import { ToWords } from "to-words";
import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import { InputAdornment, TextField } from "@mui/material";
import { LoanCalculatorType, Tenure } from "@/types/ConfigTypes";

import TinyButton from "@/components/Buttons/TinyButton/TinyButton";
import {
  defaultLoanTenureYears,
  labels,
  defaultLoanInterestRates,
  defaultLoanTenureMonths,
  defaultLoanAmount,
} from "./constants";

import styles from "./CommonLoanCalculatorInput.module.css";

type Props = {
  handleLoanAmountChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    amount?: string
  ) => void;
  handleROIChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    roi?: string
  ) => void;
  handleTenureYearsChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    years?: string
  ) => void;
  handleTenureMonthsChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    months?: string
  ) => void;
  loanCalculatorType: LoanCalculatorType;
  loanAmount: number;
  roi: string;
  tenure: Tenure;
};

const CommonLoanCalculatorInput = ({
  loanCalculatorType,
  handleLoanAmountChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
  loanAmount,
  roi,
  tenure,
}: Props) => {
  const toWords = new ToWords();

  const isActiveLoanAmountButton = useCallback(
    (amount: number) => amount === loanAmount,
    [loanAmount]
  );

  const isActiveYearButton = useCallback(
    (years: number) => years === tenure.years,
    [tenure.years]
  );

  const isActiveMonthButton = useCallback(
    (months: number) => months === tenure.months,
    [tenure.months]
  );

  const isActiveROIButton = useCallback(
    (selectedROI: number) => selectedROI.toString() === roi,
    [roi]
  );

  const selectLoanAmount = useCallback(
    (amount: number) => () =>
      handleLoanAmountChange(undefined, amount.toString()),
    [handleLoanAmountChange]
  );

  const selectYears = useCallback(
    (years: number) => () =>
      handleTenureYearsChange(undefined, years.toString()),
    [handleTenureYearsChange]
  );

  const selectMonths = useCallback(
    (months: number) => () =>
      handleTenureMonthsChange(undefined, months.toString()),
    [handleTenureMonthsChange]
  );

  const selectROI = useCallback(
    (roi: number) => () => handleROIChange(undefined, roi.toString()),
    [handleROIChange]
  );

  const loanAmountButtons = useMemo(() => {
    return (
      <div className={styles.tinyButtonsContainer}>
        {defaultLoanAmount.map((amount) => (
          <TinyButton
            key={amount.label}
            className={styles.viewMoreBlogsBtn}
            active={isActiveLoanAmountButton(amount.value)}
            onClick={selectLoanAmount(amount.value)}
          >
            {amount.label}
          </TinyButton>
        ))}
      </div>
    );
  }, [isActiveLoanAmountButton, selectLoanAmount]);

  const tenureYearButtons = useMemo(() => {
    return (
      <div className={styles.tinyButtonsContainer}>
        {defaultLoanTenureYears.map((years) => (
          <TinyButton
            key={years}
            className={styles.viewMoreBlogsBtn}
            active={isActiveYearButton(years)}
            onClick={selectYears(years)}
          >
            {years}
          </TinyButton>
        ))}
      </div>
    );
  }, [isActiveYearButton, selectYears]);

  const tenureMonthButtons = useMemo(() => {
    return (
      <div className={styles.tinyButtonsContainer}>
        {defaultLoanTenureMonths.map((months) => (
          <TinyButton
            key={months}
            className={styles.viewMoreBlogsBtn}
            active={isActiveMonthButton(months)}
            onClick={selectMonths(months)}
          >
            {months}
          </TinyButton>
        ))}
      </div>
    );
  }, [isActiveMonthButton, selectMonths]);

  const interestRateButtons = useMemo(() => {
    return (
      <div className={styles.tinyButtonsContainer}>
        {defaultLoanInterestRates.map((roi) => (
          <TinyButton
            key={roi}
            className={styles.viewMoreBlogsBtn}
            active={isActiveROIButton(roi)}
            onClick={selectROI(roi)}
          >
            {roi}
          </TinyButton>
        ))}
      </div>
    );
  }, [isActiveROIButton, selectROI]);

  return (
    <Section title={labels[loanCalculatorType].title}>
      <div className={styles.inputContainer}>
        <strong>{labels[loanCalculatorType].loanAmount}</strong>
        <TextField
          placeholder={labels[loanCalculatorType].loanAmountPlaceholder}
          variant="outlined"
          value={loanAmount ? formatPrice(loanAmount) : ""}
          onChange={handleLoanAmountChange}
          fullWidth
          margin="normal"
          sx={{ mt: 1 }}
        />
        {loanAmountButtons}
        {!!loanAmount && (
          <div className={styles.caption}>{toWords.convert(loanAmount)}</div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <strong>{labels[loanCalculatorType].roi}</strong>
        <TextField
          placeholder={labels[loanCalculatorType].roiPlaceholder}
          variant="outlined"
          value={parseFloat(roi) ? roi : ""}
          onChange={handleROIChange}
          fullWidth
          margin="normal"
          sx={{ mt: 1 }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
        />
        {interestRateButtons}
      </div>

      <div className={styles.inputContainer}>
        <strong>{labels[loanCalculatorType].tenure}</strong>
        <div className={styles.tenureContainer}>
          <div>
            <TextField
              placeholder={labels[loanCalculatorType].tenureYearsPlaceholder}
              variant="outlined"
              type="number"
              value={tenure.years || ""}
              onChange={handleTenureYearsChange}
              fullWidth
              margin="normal"
              sx={{ mt: 1 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">yrs</InputAdornment>
                  ),
                },
              }}
            />
            {tenureYearButtons}
          </div>
          <div>
            <TextField
              placeholder={labels[loanCalculatorType].tenureMonthsPlaceholder}
              variant="outlined"
              type="number"
              value={tenure.months || ""}
              onChange={handleTenureMonthsChange}
              fullWidth
              margin="normal"
              sx={{ mt: 1 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">mos</InputAdornment>
                  ),
                },
              }}
            />
            {tenureMonthButtons}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CommonLoanCalculatorInput;
