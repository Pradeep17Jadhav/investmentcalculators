import { toDecimal } from "@/helpers/numbers";
import { getUpdatedNumberWithValidation } from "@/helpers/price";
import { CalculatorType } from "@/types/ConfigTypes";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type Props = {
  calculatorType: CalculatorType;
};

export const useCalculator = ({ calculatorType }: Props) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [profit, setProfit] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);
  const [timesMultiplied, setTimesMultiplied] = useState(0);

  const calculateSIP = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = investmentPeriod;
    const maturityValue = Math.round(
      investment *
        ((Math.pow(1 + monthlyRateOfReturn, totalMonths) - 1) /
          monthlyRateOfReturn) *
        (1 + monthlyRateOfReturn)
    );
    const totalInvested = investment * totalMonths;
    const profit = maturityValue - totalInvested;
    setTotalInvestment(totalInvested);
    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / totalInvested));
  }, [expectedReturns, investmentPeriod, investment]);

  const calculateLumpsum = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = investmentPeriod;
    const maturityValue = Math.round(
      investment * Math.pow(1 + monthlyRateOfReturn, totalMonths)
    );
    const profit = maturityValue - investment;

    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / investment));
  }, [expectedReturns, investmentPeriod, investment]);

  const calculate = useCallback(() => {
    switch (calculatorType) {
      case CalculatorType.SIP: {
        calculateSIP();
        break;
      }
      case CalculatorType.FD: {
        calculateSIP();
        break;
      }
      case CalculatorType.RD: {
        calculateSIP();
        break;
      }
      case CalculatorType.Lumpsum: {
        calculateLumpsum();
        break;
      }
    }
  }, [calculateSIP, calculateLumpsum, calculatorType]);

  const handleInvestmentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newInvestment = e.target.value || "0";
      setInvestment((currInvestment) =>
        getUpdatedNumberWithValidation(
          newInvestment,
          currInvestment,
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
      setExpectedReturns((currExpectedReturns) =>
        getUpdatedNumberWithValidation(
          newExpectedReturns,
          currExpectedReturns,
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
    if (!investment || !expectedReturns || !investmentPeriod) {
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
  }, [investment, expectedReturns, investmentPeriod]);

  return {
    isValidForm,
    investment,
    yearlyInvestment: investment * 12,
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
