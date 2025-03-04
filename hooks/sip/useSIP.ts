import { toDecimal } from "@/helpers/numbers";
import { getUpdatedNumberWithValidation } from "@/helpers/price";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useSIP = () => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [profit, setProfit] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);
  const [timesMultiplied, setTimesMultiplied] = useState(0);

  const calculate = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = investmentPeriod;
    const maturityValue = Math.round(
      monthlyInvestment *
        ((Math.pow(1 + monthlyRateOfReturn, totalMonths) - 1) /
          monthlyRateOfReturn) *
        (1 + monthlyRateOfReturn)
    );
    const totalInvested = monthlyInvestment * totalMonths;
    const profit = maturityValue - totalInvested;
    setTotalInvestment(totalInvested);
    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / totalInvested));
  }, [expectedReturns, investmentPeriod, monthlyInvestment]);

  const handleInvestmentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newMonthlyInvestment = e.target.value || "0";
      setMonthlyInvestment((monthlyInvestment) =>
        getUpdatedNumberWithValidation(
          newMonthlyInvestment,
          monthlyInvestment,
          true,
          0,
          10000000
        )
      );
    },
    []
  );

  const handleExpectedReturnsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newExpectedReturns = e.target.value || "0";
      setExpectedReturns((expectedReturns) =>
        getUpdatedNumberWithValidation(
          newExpectedReturns,
          expectedReturns,
          false,
          0,
          100
        )
      );
    },
    []
  );

  const handleInvestmentPeriodChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newInvestmentPeriod = e.target.value || "0";
      setInvestmentPeriod((investmentPeriod) =>
        getUpdatedNumberWithValidation(
          newInvestmentPeriod,
          investmentPeriod,
          false,
          0,
          600
        )
      );
    },
    []
  );

  useEffect(() => {
    if (!monthlyInvestment || !expectedReturns || !investmentPeriod) {
      setIsValidForm(false);
      setTotalInvestment(0);
      setMaturityValue(0);
      setProfit(0);
      setTimesMultiplied(0);
      return;
    }
    setIsValidForm(true);
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyInvestment, expectedReturns, investmentPeriod]);

  return {
    isValidForm,
    monthlyInvestment,
    yearlyInvestment: monthlyInvestment * 12,
    totalInvestment,
    expectedReturns,
    investmentPeriod,
    profit,
    maturityValue,
    timesMultiplied,
    handleInvestmentChange,
    handleExpectedReturnsChange,
    handleInvestmentPeriodChange,
  };
};
