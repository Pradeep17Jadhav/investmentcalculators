"use client";

import { ChangeEvent, useCallback } from "react";
import { Dayjs } from "dayjs";
import Section from "@/components/Section/Section";
import { useLoanSelection } from "@/hooks/Loan/useLoanSelection";
import { LoanCalculatorType, Tenure } from "@/types/ConfigTypes";
import {
  defaultLoanTenureYears,
  labels,
  defaultLoanInterestRates,
  defaultLoanTenureMonths,
  defaultLoanAmount,
} from "./constants";
import InputElement from "../../InputElement/InputElement";
import TenureInputElement from "../../TenureInputElement/TenureInputElement";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import { useMediaQuery, useTheme } from "@mui/material";
import PaymentInputItem from "../../PaymentInput/PaymentInputItem";
import { PrepaymentInterval } from "@/hooks/Loan/usePrepayments";
import {
  PrepaymentsActionType,
  usePrepaymentsProvider,
} from "@/contexts/loan/prepaymentsContext";
import TinyButton from "@/components/Buttons/TinyButton/TinyButton";

import styles from "./CommonLoanCalculatorInput.module.css";

type Props = {
  loanCalculatorType: LoanCalculatorType;
  loanAmount: number;
  roi: string;
  tenure: Tenure;
  isValidForm: boolean;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  minRoi: number;
  maxRoi: number;
  stepRoi: number;
  calculate: () => void;
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
};

const CommonLoanCalculatorInput = ({
  loanCalculatorType,
  loanAmount,
  roi,
  tenure,
  isValidForm,
  minAmount,
  maxAmount,
  stepAmount,
  minRoi,
  maxRoi,
  stepRoi,
  calculate,
  handleLoanAmountChange,
  handleROIChange,
  handleTenureYearsChange,
  handleTenureMonthsChange,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { dispatch, prepayments } = usePrepaymentsProvider();

  const {
    isActiveLoanAmountButton,
    isActiveYearButton,
    isActiveMonthButton,
    isActiveROIButton,
    selectLoanAmount,
    selectYears,
    selectMonths,
    selectROI,
  } = useLoanSelection({
    loanAmount,
    tenure,
    roi,
    handleLoanAmountChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  });

  const onPrepaymentChange = useCallback(
    (startDate: Dayjs) => (newAmount: number) => {
      dispatch({
        type: PrepaymentsActionType.UPDATE_AMOUNT,
        startDate,
        amount: newAmount,
      });
    },
    [dispatch]
  );

  const onIntervalChange = useCallback(
    (startDate: Dayjs) => (newInterval: PrepaymentInterval) => {
      dispatch({
        type: PrepaymentsActionType.UPDATE_INTERVAL,
        startDate,
        interval: newInterval,
      });
    },
    [dispatch]
  );

  const onStartDateChange = useCallback(
    (startDate: Dayjs) => (newStartDate: Dayjs) => {
      dispatch({
        type: PrepaymentsActionType.UPDATE_START_DATE,
        startDate,
        newStartDate,
      });
    },
    [dispatch]
  );

  const onAddPrepaymentClick = useCallback(() => {
    dispatch({
      type: PrepaymentsActionType.ADD_PREPAYMENT,
    });
  }, [dispatch]);

  return (
    <Section title={labels[loanCalculatorType].title}>
      <InputElement
        value={loanAmount}
        buttonsData={defaultLoanAmount}
        hideSelectionButtons={isMobile}
        label={labels[loanCalculatorType].loanAmount}
        placeholder={labels[loanCalculatorType].loanAmountPlaceholder}
        isPrice={true}
        handleChange={handleLoanAmountChange}
        isActiveShortcutButton={isActiveLoanAmountButton}
        selectShortcutButton={selectLoanAmount}
        step={stepAmount}
        min={minAmount}
        max={maxAmount / 50}
      />

      <InputElement
        value={roi}
        buttonsData={defaultLoanInterestRates}
        hideSelectionButtons={isMobile}
        label={labels[loanCalculatorType].roi}
        placeholder={labels[loanCalculatorType].roiPlaceholder}
        handleChange={handleROIChange}
        isActiveShortcutButton={isActiveROIButton}
        selectShortcutButton={selectROI}
        isROI
        step={stepRoi}
        min={minRoi}
        max={maxRoi / 4}
      />

      <TenureInputElement
        tenure={tenure}
        hideSelectionButtons={isMobile}
        label={labels[loanCalculatorType].tenure}
        placeholderYears={labels[loanCalculatorType].tenureYearsPlaceholder}
        placeholderMonths={labels[loanCalculatorType].tenureMonthsPlaceholder}
        yearsData={defaultLoanTenureYears}
        monthsData={defaultLoanTenureMonths}
        handleYearChange={handleTenureYearsChange}
        handleMonthChange={handleTenureMonthsChange}
        isActiveYearButton={isActiveYearButton}
        isActiveMonthButton={isActiveMonthButton}
        selectYears={selectYears}
        selectMonths={selectMonths}
        showMonths
      />

      <strong style={{ marginBottom: "16px" }}>Prepayments</strong>
      {prepayments.map((prepayment, i) => (
        <PaymentInputItem
          className={styles.prepaymentItem}
          key={prepayment.startDate.unix() + i}
          intervalLabel="Interval"
          amountLabel="Prepayment Amount"
          dateLabel="Start Month"
          interval={prepayment.interval}
          amountValue={prepayment.amount}
          dateValue={prepayment.startDate}
          onAmountChange={onPrepaymentChange(prepayment.startDate)}
          onDateChange={onStartDateChange(prepayment.startDate)}
          onIntervalChange={onIntervalChange(prepayment.startDate)}
        />
      ))}
      {false && (
        <TinyButton
          className={styles.addPrepaymentButton}
          onClick={onAddPrepaymentClick}
          roundBorder
        >{`Add Prepayment`}</TinyButton>
      )}

      {isMobile && (
        <LargeButton onClick={calculate} disabled={!isValidForm} centered>
          CALCULATE
        </LargeButton>
      )}
    </Section>
  );
};

export default CommonLoanCalculatorInput;
