"use client";

import { useCallback } from "react";
import { Dayjs } from "dayjs";
import PaymentInputItem from "@/components/Common/PaymentInput/PaymentInputItem";
import { PrepaymentInterval } from "@/hooks/Loan/usePrepayments";
import TinyButton from "@/components/Buttons/TinyButton/TinyButton";
import {
  PrepaymentsActionType,
  usePrepaymentsProvider,
} from "@/contexts/loan/prepaymentsContext";

import styles from "./PrepaymentInputElement.module.css";

const PrepaymentInputElement = () => {
  const { dispatch, prepayments } = usePrepaymentsProvider();

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
    <div className={styles.inputContainer}>
      <strong>Prepayments</strong>
      <div className={styles.prepaymentsContainer}>
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
      </div>

      <TinyButton
        className={styles.addPrepaymentButton}
        onClick={onAddPrepaymentClick}
        roundBorder
        centered
      >{`Add Prepayment`}</TinyButton>
    </div>
  );
};

export default PrepaymentInputElement;
