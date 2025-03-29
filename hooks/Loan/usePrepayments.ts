import { useState, useEffect } from "react";
import dayjs from "dayjs";

type Prepayments = Record<string, number>;

type UsePrepaymentProps = {
  monthlyPrepaymentStartDate?: string;
  quarterlyPrepaymentStartDate?: string;
  halfAnnualyPrepaymentStartDate?: string;
  annuallyPrepaymentStartDate?: string;
  oneTimePrepayments?: { startDate: number; amount: number }[];
  monthlyPrepaymentAmount?: number;
  quarterlyPrepaymentAmount?: number;
  halfAnnualyPrepaymentAmount?: number;
  annuallyPrepaymentAmount?: number;
};

export const usePrepayment = ({
  monthlyPrepaymentStartDate,
  quarterlyPrepaymentStartDate,
  halfAnnualyPrepaymentStartDate,
  annuallyPrepaymentStartDate,
  oneTimePrepayments = [],
  monthlyPrepaymentAmount = 0,
  quarterlyPrepaymentAmount = 0,
  halfAnnualyPrepaymentAmount = 0,
  annuallyPrepaymentAmount = 0,
}: UsePrepaymentProps) => {
  const [prepayments, setPrepayments] = useState<Prepayments>({});

  useEffect(() => {
    const newPrepayments: Prepayments = {};
    const baseDate = dayjs();

    const addPrepayment = (
      date: dayjs.Dayjs,
      amount: number,
      interval: number
    ) => {
      while (date.isAfter(baseDate) || date.isSame(baseDate, "month")) {
        const key = date.format("YYYYMM");
        newPrepayments[key] = (newPrepayments[key] || 0) + amount;
        date = date.add(interval, "month");
      }
    };

    if (monthlyPrepaymentStartDate && monthlyPrepaymentAmount > 0) {
      addPrepayment(
        dayjs(monthlyPrepaymentStartDate),
        monthlyPrepaymentAmount,
        1
      );
    }

    if (quarterlyPrepaymentStartDate && quarterlyPrepaymentAmount > 0) {
      addPrepayment(
        dayjs(quarterlyPrepaymentStartDate),
        quarterlyPrepaymentAmount,
        3
      );
    }

    if (halfAnnualyPrepaymentStartDate && halfAnnualyPrepaymentAmount > 0) {
      addPrepayment(
        dayjs(halfAnnualyPrepaymentStartDate),
        halfAnnualyPrepaymentAmount,
        6
      );
    }

    if (annuallyPrepaymentStartDate && annuallyPrepaymentAmount > 0) {
      addPrepayment(
        dayjs(annuallyPrepaymentStartDate),
        annuallyPrepaymentAmount,
        12
      );
    }

    oneTimePrepayments.forEach(({ startDate, amount }) => {
      const key = startDate.toString();
      newPrepayments[key] = (newPrepayments[key] || 0) + amount;
    });

    setPrepayments(newPrepayments);
  }, [
    monthlyPrepaymentStartDate,
    quarterlyPrepaymentStartDate,
    halfAnnualyPrepaymentStartDate,
    annuallyPrepaymentStartDate,
    oneTimePrepayments,
    monthlyPrepaymentAmount,
    quarterlyPrepaymentAmount,
    halfAnnualyPrepaymentAmount,
    annuallyPrepaymentAmount,
  ]);

  return { prepayments };
};
