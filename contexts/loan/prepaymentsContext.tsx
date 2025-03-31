"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Prepayment, PrepaymentInterval } from "@/hooks/Loan/usePrepayments";

const getDefaultPrepayment = () => ({
  amount: 0,
  startDate: dayjs(),
  interval: PrepaymentInterval.ONE_TIME,
  id: Date.now(),
});

const defaultPrepayments: Prepayment[] = [getDefaultPrepayment()];

export enum PrepaymentsActionType {
  UPDATE_AMOUNT = "UPDATE_AMOUNT",
  UPDATE_START_DATE = "UPDATE_START_DATE",
  UPDATE_INTERVAL = "UPDATE_INTERVAL",
  ADD_PREPAYMENT = "ADD_PREPAYMENT",
  REMOVE_PREPAYMENT = "REMOVE_PREPAYMENT",
}

export type PrepaymentsAction =
  | {
      type: PrepaymentsActionType.UPDATE_AMOUNT;
      startDate: Dayjs;
      amount: number;
    }
  | {
      type: PrepaymentsActionType.UPDATE_START_DATE;
      startDate: Dayjs;
      newStartDate: Dayjs;
    }
  | {
      type: PrepaymentsActionType.UPDATE_INTERVAL;
      startDate: Dayjs;
      interval: PrepaymentInterval;
    }
  | { type: PrepaymentsActionType.ADD_PREPAYMENT }
  | { type: PrepaymentsActionType.REMOVE_PREPAYMENT; startDate: Dayjs };

const prepaymentsReducer = (
  state: Prepayment[],
  action: PrepaymentsAction
): Prepayment[] => {
  switch (action.type) {
    case PrepaymentsActionType.UPDATE_AMOUNT:
      return state.map((prepayment) =>
        prepayment.startDate.isSame(action.startDate)
          ? { ...prepayment, amount: action.amount }
          : prepayment
      );
    case PrepaymentsActionType.UPDATE_START_DATE:
      return state.map((prepayment) =>
        prepayment.startDate.isSame(action.startDate)
          ? { ...prepayment, startDate: action.newStartDate }
          : prepayment
      );
    case PrepaymentsActionType.UPDATE_INTERVAL:
      return state.map((prepayment) =>
        prepayment.startDate.isSame(action.startDate)
          ? { ...prepayment, interval: action.interval }
          : prepayment
      );
    case PrepaymentsActionType.ADD_PREPAYMENT:
      return [...state, getDefaultPrepayment()];
    case PrepaymentsActionType.REMOVE_PREPAYMENT:
      return state.filter(
        (prepayment) => !prepayment.startDate.isSame(action.startDate)
      );
    default:
      return state;
  }
};

const PrepaymentsContext = createContext<PrepaymentsContextType>({
  prepayments: [],
  dispatch: () => {},
});

type PrepaymentsContextType = {
  prepayments: Prepayment[];
  dispatch: React.Dispatch<PrepaymentsAction>;
};

export const PrepaymentsProvider = ({ children }: { children: ReactNode }) => {
  const [prepayments, dispatch] = useReducer(
    prepaymentsReducer,
    defaultPrepayments
  );

  return (
    <PrepaymentsContext.Provider value={{ prepayments, dispatch }}>
      {children}
    </PrepaymentsContext.Provider>
  );
};

export const usePrepaymentsProvider = () => {
  const context = useContext(PrepaymentsContext);
  if (!context) {
    throw new Error("usePrepayments must be used within a PrepaymentsProvider");
  }
  return context;
};
