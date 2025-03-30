import { useState, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Tenure } from "@/types/ConfigTypes";

export type PrepaymentsByMonth = Record<string, number>;
export enum PrepaymentInterval {
  ONE_TIME = "One Time",
  MONTHLY = "Monthly",
  QUARTERLY = "Quarterly",
  HALF_ANNUALLY = "Half Annually",
  ANNUALLY = "Annually",
}

export type Prepayment = {
  startDate: Dayjs;
  amount: number;
  interval: PrepaymentInterval;
};

export const usePrepayment = ({
  prepayments,
  tenure,
}: {
  prepayments: Prepayment[];
  tenure: Tenure;
}) => {
  const [prepaymentsByMonth, setPrepaymentsByMonth] =
    useState<PrepaymentsByMonth>({});
  const [hasPrepayments, setHasPrepayments] = useState<boolean>(false);
  const [totalPrepayments, setTotalPrepayments] = useState<number>(0);

  const getRemainingIterations = useCallback(
    (interval: PrepaymentInterval) => {
      switch (interval) {
        case PrepaymentInterval.ONE_TIME:
          return 1;
        case PrepaymentInterval.ANNUALLY:
          return tenure.years + 1;
        case PrepaymentInterval.HALF_ANNUALLY:
          return tenure.years * 2 + 2;
        case PrepaymentInterval.QUARTERLY:
          return tenure.years * 4 + 5;
        case PrepaymentInterval.MONTHLY:
          return tenure.years * 12 + tenure.months + 1;
      }
    },
    [tenure.months, tenure.years]
  );

  useEffect(() => {
    const newPrepayments: PrepaymentsByMonth = {};
    prepayments.forEach(({ startDate, amount, interval }) => {
      if (!tenure.years && !tenure.months && !tenure.days) {
        return;
      }
      let remainingIterations = getRemainingIterations(interval);
      let count = 0;
      while (
        (startDate.isAfter(dayjs()) || startDate.isSame(dayjs(), "month")) &&
        remainingIterations
      ) {
        count += 1;
        const key = startDate.format("YYYYMM");
        console.log(key, count);
        newPrepayments[key] = (newPrepayments[key] || 0) + amount;
        remainingIterations -= 1;

        switch (interval) {
          case PrepaymentInterval.MONTHLY:
            startDate = startDate.add(1, "month");
            break;
          case PrepaymentInterval.QUARTERLY:
            startDate = startDate.add(3, "month");
            break;
          case PrepaymentInterval.HALF_ANNUALLY:
            startDate = startDate.add(6, "month");
            break;
          case PrepaymentInterval.ANNUALLY:
            startDate = startDate.add(12, "month");
            break;
        }
      }
    });

    setPrepaymentsByMonth(newPrepayments);
    setHasPrepayments(
      Object.values(newPrepayments).some((amount) => amount > 0)
    );
    setTotalPrepayments(
      Object.values(newPrepayments).reduce((acc, amount) => acc + amount, 0)
    );
  }, [
    getRemainingIterations,
    prepayments,
    tenure.days,
    tenure.months,
    tenure.years,
  ]);

  return { prepaymentsByMonth, hasPrepayments, totalPrepayments };
};
