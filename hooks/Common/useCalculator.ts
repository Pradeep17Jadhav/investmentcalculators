import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toDecimal } from "@/helpers/numbers";
import { getUpdatedNumberWithValidation } from "@/helpers/price";
import { CalculatorType, Tenure } from "@/types/ConfigTypes";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  calculatorType: CalculatorType;
};

const initialInvestmentPeriod = {
  years: 0,
  months: 0,
  days: 0,
};

export const useCalculator = ({ calculatorType }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isValidForm, setIsValidForm] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [investment, setInvestment] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const [tenure, setTenure] = useState<Tenure>(initialInvestmentPeriod);
  const [profit, setProfit] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);
  const [timesMultiplied, setTimesMultiplied] = useState(0);

  const calculateTotalInvestment = useCallback(() => {
    if (!investment) {
      return;
    }
    const totalMonths = tenure.years * 12 + tenure.months;
    const totalInvested = investment * totalMonths;
    setTotalInvestment(totalInvested);
  }, [investment, tenure.months, tenure.years]);

  const calculateSIP = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = tenure.years * 12 + tenure.months;
    const maturityValue = Math.round(
      investment *
        ((Math.pow(1 + monthlyRateOfReturn, totalMonths) - 1) /
          monthlyRateOfReturn) *
        (1 + monthlyRateOfReturn)
    );
    const totalInvested = investment * totalMonths;
    const profit = maturityValue - totalInvested;
    calculateTotalInvestment();
    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / totalInvested));
  }, [
    expectedReturns,
    tenure.years,
    tenure.months,
    investment,
    calculateTotalInvestment,
  ]);

  const calculateFD = useCallback(() => {
    const totalMonths =
      tenure.years * 12 + tenure.months + tenure.days / 30.4375;
    const quarterlyRateOfReturn = expectedReturns / 400;
    const totalQuarters = totalMonths / 3;
    const maturityValue = Math.round(
      investment * Math.pow(1 + quarterlyRateOfReturn, totalQuarters)
    );
    const profit = maturityValue - investment;

    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / investment));
  }, [tenure.years, tenure.months, tenure.days, expectedReturns, investment]);

  const calculateRD = useCallback(() => {
    const compoundFrequency = 4; //4 times per year
    const totalMonths =
      tenure.years * 12 + tenure.months + tenure.days / 30.4375;
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
  }, [tenure.years, tenure.months, tenure.days, expectedReturns, investment]);

  const calculateLumpsum = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + expectedReturns / 100, 1 / 12) - 1;
    const totalMonths = tenure.years * 12 + tenure.months;
    const maturityValue = Math.round(
      investment * Math.pow(1 + monthlyRateOfReturn, totalMonths)
    );
    const profit = maturityValue - investment;

    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / investment));
  }, [expectedReturns, tenure, investment]);

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
    setResultsReady(true);
  }, [
    calculateSIP,
    calculateLumpsum,
    calculateFD,
    calculateRD,
    calculatorType,
  ]);

  const handleInvestmentChange = useCallback(
    (
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      investment?: string
    ) => {
      const newInvestment = e?.target.value || investment || "0";
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

  const handleROIChange = useCallback(
    (e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, roi?: string) => {
      const newExpectedReturns = e?.target.value || roi || "0";
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

  const handleTenureYearsChange = useCallback(
    (
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      years?: string
    ) => {
      const newTenureYears = e?.target.value || years || "0";
      setTenure((tenure) => ({
        ...tenure,
        years: getUpdatedNumberWithValidation(
          newTenureYears,
          tenure.years,
          false,
          0,
          100
        ),
      }));
    },
    []
  );

  const handleTenureMonthsChange = useCallback(
    (
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      months?: string
    ) => {
      const newTenureMonths = e?.target.value || months || "0";
      setTenure((tenure) => ({
        ...tenure,
        months: getUpdatedNumberWithValidation(
          newTenureMonths,
          tenure.months,
          false,
          0,
          11
        ),
      }));
    },
    []
  );

  useEffect(() => {
    setResultsReady(false);
    calculateTotalInvestment();
    if (!investment || !expectedReturns || (!tenure.months && !tenure.years)) {
      setIsValidForm(false);
      setMaturityValue(0);
      setProfit(0);
      setTimesMultiplied(0);
      return;
    }
    setIsValidForm(true);
    if (!isMobile) {
      calculate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investment, expectedReturns, tenure]);

  return {
    isValidForm,
    resultsReady,
    investment,
    yearlyInvestment: investment * 12,
    totalInvestment,
    expectedReturns,
    tenure,
    profit,
    maturityValue,
    timesMultiplied,
    calculate,
    handleInvestmentChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  };
};
