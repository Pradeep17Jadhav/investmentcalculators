import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";

type Prepayments = Record<string, number>;

type UsePrepaymentProps = {
  monthlyPrepaymentStartDate?: number;
  quarterlyPrepaymentStartDate?: number;
  halfAnnualyPrepaymentStartDate?: number;
  annuallyPrepaymentStartDate?: number;
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
  const [hasPrepayments, setHasPrepayments] = useState<boolean>(false);
  const memoizedOneTimePrepayments = useMemo(
    () => JSON.stringify(oneTimePrepayments),
    [oneTimePrepayments]
  );

  const addPrepayment = (
    startDate: number | undefined,
    amount: number,
    interval: number,
    newPrepayments: Prepayments,
    baseDate: dayjs.Dayjs
  ) => {
    if (!startDate || amount <= 0) return;

    let date = dayjs(startDate.toString(), "YYYYMM");
    while (date.isAfter(baseDate) || date.isSame(baseDate, "month")) {
      const key = date.format("YYYYMM");
      newPrepayments[key] = (newPrepayments[key] || 0) + amount;
      date = date.add(interval, "month");
    }
  };

  const addOneTimePrepayments = (
    oneTimePrepayments: { startDate: number; amount: number }[],
    newPrepayments: Prepayments
  ) => {
    oneTimePrepayments.forEach(({ startDate, amount }) => {
      const dateKey = dayjs(startDate.toString(), "YYYYMM").format("YYYYMM");
      newPrepayments[dateKey] = (newPrepayments[dateKey] || 0) + amount;
    });
  };

  useEffect(() => {
    if (!monthlyPrepaymentStartDate || monthlyPrepaymentAmount <= 0) return;
    setPrepayments((prev) => {
      const newPrepayments = { ...prev };
      addPrepayment(
        monthlyPrepaymentStartDate,
        monthlyPrepaymentAmount,
        1,
        newPrepayments,
        dayjs()
      );
      return newPrepayments;
    });
  }, [monthlyPrepaymentStartDate, monthlyPrepaymentAmount]);

  useEffect(() => {
    if (!quarterlyPrepaymentStartDate || quarterlyPrepaymentAmount <= 0) return;
    setPrepayments((prev) => {
      const newPrepayments = { ...prev };
      addPrepayment(
        quarterlyPrepaymentStartDate,
        quarterlyPrepaymentAmount,
        3,
        newPrepayments,
        dayjs()
      );
      return newPrepayments;
    });
  }, [quarterlyPrepaymentStartDate, quarterlyPrepaymentAmount]);

  useEffect(() => {
    if (!halfAnnualyPrepaymentStartDate || halfAnnualyPrepaymentAmount <= 0)
      return;
    setPrepayments((prev) => {
      const newPrepayments = { ...prev };
      addPrepayment(
        halfAnnualyPrepaymentStartDate,
        halfAnnualyPrepaymentAmount,
        6,
        newPrepayments,
        dayjs()
      );
      return newPrepayments;
    });
  }, [halfAnnualyPrepaymentStartDate, halfAnnualyPrepaymentAmount]);

  useEffect(() => {
    if (!annuallyPrepaymentStartDate || annuallyPrepaymentAmount <= 0) return;
    setPrepayments((prev) => {
      const newPrepayments = { ...prev };
      addPrepayment(
        annuallyPrepaymentStartDate,
        annuallyPrepaymentAmount,
        12,
        newPrepayments,
        dayjs()
      );
      return newPrepayments;
    });
  }, [annuallyPrepaymentStartDate, annuallyPrepaymentAmount]);

  useEffect(() => {
    setPrepayments((prev) => {
      const newPrepayments = { ...prev };
      addOneTimePrepayments(
        JSON.parse(memoizedOneTimePrepayments),
        newPrepayments
      );
      return newPrepayments;
    });
  }, [memoizedOneTimePrepayments]);

  useEffect(() => {
    const totalPrepayments = Object.values(prepayments).reduce(
      (sum, amount) => sum + amount,
      0
    );
    setHasPrepayments(!!totalPrepayments);
  }, [prepayments]);

  return { prepayments, hasPrepayments };
};
