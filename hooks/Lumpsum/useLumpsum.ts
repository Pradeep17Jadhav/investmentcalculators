import { toDecimal } from "@/helpers/numbers";
import { getUpdatedNumberWithValidation } from "@/helpers/price";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useLumpsum = () => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [lumpsumInvestment, setLumpsumInvestment] = useState(0);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [profit, setProfit] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);
  const [timesMultiplied, setTimesMultiplied] = useState(0);

  const calculate = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = investmentPeriod;

    const maturityValue = Math.round(
      lumpsumInvestment * Math.pow(1 + monthlyRateOfReturn, totalMonths)
    );

    const totalInvested = lumpsumInvestment;
    const profit = maturityValue - totalInvested;

    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / totalInvested));
  }, [expectedReturns, investmentPeriod, lumpsumInvestment]);

  const handleInvestmentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newMonthlyInvestment = e.target.value || "0";
      setLumpsumInvestment((monthlyInvestment) =>
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
    if (!lumpsumInvestment || !expectedReturns || !investmentPeriod) {
      setIsValidForm(false);
      setMaturityValue(0);
      setProfit(0);
      setTimesMultiplied(0);
      return;
    }
    setIsValidForm(true);
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lumpsumInvestment, expectedReturns, investmentPeriod]);

  return {
    isValidForm,
    lumpsumInvestment,
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
