import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toDecimal } from "@/helpers/numbers";
import { getUpdatedNumberWithValidation } from "@/helpers/price";
import { CalculatorType, InvestmentPeriod } from "@/types/ConfigTypes";

type Props = {
  calculatorType: CalculatorType;
};

const initialInvestmentPeriod = {
  years: 0,
  months: 0,
  days: 0,
};

export const useCalculator = ({ calculatorType }: Props) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const [investmentPeriod, setInvestmentPeriod] = useState<InvestmentPeriod>(
    initialInvestmentPeriod
  );
  const [profit, setProfit] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);
  const [timesMultiplied, setTimesMultiplied] = useState(0);

  const calculateSIP = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = investmentPeriod.months;
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

  const calculateFD = useCallback(() => {
    const totalMonths =
      investmentPeriod.years * 12 +
      investmentPeriod.months +
      investmentPeriod.days / 30;
    const quarterlyRateOfReturn = expectedReturns / 400;
    const totalQuarters = totalMonths / 3;
    const maturityValue = Math.round(
      investment * Math.pow(1 + quarterlyRateOfReturn, totalQuarters)
    );
    const profit = maturityValue - investment;

    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / investment));
  }, [
    investmentPeriod.years,
    investmentPeriod.months,
    investmentPeriod.days,
    expectedReturns,
    investment,
  ]);

  const calculateRD = useCallback(() => {
    const compoundFrequency = 4; //4 times per year
    const totalMonths =
      investmentPeriod.years * 12 +
      investmentPeriod.months +
      investmentPeriod.days / 30;
    const monthlyRateOfReturn = expectedReturns / 100 / compoundFrequency;
    let totalMaturityValue = 0;
    const totalInvestment = investment * totalMonths;
    for (let i = 1; i <= totalMonths; i++) {
      const monthsLeft = totalMonths - i + 1;
      const timeInYears = monthsLeft / 12;
      const maturityValueForDeposit =
        investment *
        Math.pow(1 + monthlyRateOfReturn, compoundFrequency * timeInYears);
      totalMaturityValue += maturityValueForDeposit;
    }
    const profit = totalMaturityValue - totalInvestment;
    setMaturityValue(Math.round(totalMaturityValue));
    setProfit(Math.round(profit));
    setTotalInvestment(totalInvestment);
    setTimesMultiplied(toDecimal(totalMaturityValue / totalInvestment));
  }, [
    investmentPeriod.years,
    investmentPeriod.months,
    investmentPeriod.days,
    expectedReturns,
    investment,
  ]);

  const calculateLumpsum = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = investmentPeriod.months;
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
        calculateFD();
        break;
      }
      case CalculatorType.RD: {
        calculateRD();
        break;
      }
      case CalculatorType.Lumpsum: {
        calculateLumpsum();
        break;
      }
    }
  }, [
    calculateSIP,
    calculateLumpsum,
    calculateFD,
    calculateRD,
    calculatorType,
  ]);

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
      setInvestmentPeriod((investmentPeriod) => ({
        ...investmentPeriod,
        months: getUpdatedNumberWithValidation(
          newInvestmentPeriod,
          investmentPeriod.months,
          false,
          0,
          600
        ),
      }));
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
