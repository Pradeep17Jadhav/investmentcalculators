import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { sanitizeROI, toDecimal } from "@/helpers/numbers";
import {
  getUpdatedInterestRateWithValidation,
  getUpdatedNumberWithValidation,
} from "@/helpers/price";
import { CalculatorType, Tenure } from "@/types/ConfigTypes";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  getMaximumInitialInvestment,
  getMaximumInvestment,
  getMinimumInvestment,
  MAX_ROI,
  MIN_INVESTMENT,
  MIN_ROI,
} from "@/constants/calculator";
import {
  getDefaultInvestment,
  getDefaultROI,
  getDefaultTenure,
} from "./constants";

type Props = {
  calculatorType: CalculatorType;
};

export const useCalculator = ({ calculatorType }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isValidForm, setIsValidForm] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [haveInitialInvestment, setHaveInitialInvestment] = useState(false);
  const [investment, setInvestment] = useState<number>(
    getDefaultInvestment(calculatorType)
  );
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [roi, setRoi] = useState<string>(getDefaultROI(calculatorType));
  const [tenure, setTenure] = useState<Tenure>(
    getDefaultTenure(calculatorType)
  );
  const [profit, setProfit] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);
  const [timesMultiplied, setTimesMultiplied] = useState(0);

  const calculateTotalInvestment = useCallback(() => {
    if (!investment) {
      return;
    }
    const totalMonths =
      tenure.years * 12 + tenure.months + tenure.days / 30.4375;
    let totalInvested = investment * totalMonths;
    totalInvested += haveInitialInvestment ? initialInvestment : 0;
    setTotalInvestment(totalInvested);
  }, [
    haveInitialInvestment,
    initialInvestment,
    investment,
    tenure.days,
    tenure.months,
    tenure.years,
  ]);

  const calculateSIP = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + parseFloat(roi) / 100, 1 / 12) - 1;
    const totalMonths =
      tenure.years * 12 + tenure.months + tenure.days / 30.4375;
    const maturityValue = Math.round(
      investment *
        ((Math.pow(1 + monthlyRateOfReturn, totalMonths) - 1) /
          monthlyRateOfReturn) *
        (1 + monthlyRateOfReturn)
    );
    const totalInvested = initialInvestment + investment * totalMonths;
    const initialInvestmentMaturityValue = haveInitialInvestment
      ? Math.round(
          initialInvestment * Math.pow(1 + monthlyRateOfReturn, totalMonths)
        )
      : 0;
    const combinedMaturityValue =
      maturityValue + initialInvestmentMaturityValue;
    const updatedProfit = combinedMaturityValue - totalInvested;

    calculateTotalInvestment();
    setMaturityValue(combinedMaturityValue);
    setProfit(updatedProfit);
    setTimesMultiplied(toDecimal(combinedMaturityValue / totalInvested));
  }, [
    roi,
    tenure.years,
    tenure.months,
    tenure.days,
    haveInitialInvestment,
    investment,
    initialInvestment,
    calculateTotalInvestment,
  ]);

  const calculateFD = useCallback(() => {
    const totalMonths =
      tenure.years * 12 + tenure.months + tenure.days / 30.4375;
    const quarterlyRateOfReturn = parseFloat(roi) / 400;
    const totalQuarters = totalMonths / 3;
    const maturityValue = Math.round(
      investment * Math.pow(1 + quarterlyRateOfReturn, totalQuarters)
    );
    const profit = maturityValue - investment;

    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / investment));
  }, [tenure.years, tenure.months, tenure.days, roi, investment]);

  const calculateRD = useCallback(() => {
    const compoundFrequency = 4; //4 times per year
    const totalMonths =
      tenure.years * 12 + tenure.months + tenure.days / 30.4375;
    const monthlyRateOfReturn = parseFloat(roi) / 100 / compoundFrequency;
    let totalMaturityValue = 0;
    const totalInvestment = initialInvestment + investment * totalMonths;
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
    tenure.years,
    tenure.months,
    tenure.days,
    roi,
    initialInvestment,
    investment,
  ]);

  const calculateLumpsum = useCallback(() => {
    const monthlyRateOfReturn = Math.pow(1 + parseFloat(roi) / 100, 1 / 12) - 1;
    const totalMonths = tenure.years * 12 + tenure.months;
    const maturityValue = Math.round(
      investment * Math.pow(1 + monthlyRateOfReturn, totalMonths)
    );
    const profit = maturityValue - investment;

    setMaturityValue(maturityValue);
    setProfit(profit);
    setTimesMultiplied(toDecimal(maturityValue / investment));
  }, [roi, tenure, investment]);

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
      case CalculatorType.LUMPSUM: {
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

  const handleInitialInvestmentChange = useCallback(
    (
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      initialInvestment?: string
    ) => {
      const investment = e?.target.value || initialInvestment || "0";
      const maximumInvestment = getMaximumInitialInvestment();
      setInitialInvestment((currInvestment) =>
        getUpdatedNumberWithValidation(
          investment,
          currInvestment,
          true,
          MIN_INVESTMENT,
          maximumInvestment
        )
      );
    },
    []
  );

  const handleInvestmentChange = useCallback(
    (
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      investment?: string
    ) => {
      const newInvestment = e?.target.value || investment || "0";
      const maximumInvestment = getMaximumInvestment(calculatorType);
      const minimumInvestment = getMinimumInvestment(calculatorType);
      setInvestment((currInvestment) =>
        getUpdatedNumberWithValidation(
          newInvestment,
          currInvestment,
          true,
          minimumInvestment,
          maximumInvestment
        )
      );
    },
    [calculatorType]
  );

  const handleROIChange = useCallback(
    (e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, roi?: string) => {
      const newROI = e?.target.value || roi || "";
      const sanitizedROI = sanitizeROI(newROI);
      setRoi((currROI) =>
        getUpdatedInterestRateWithValidation(
          sanitizedROI,
          currROI,
          MIN_ROI,
          MAX_ROI
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
    if (!investment || !roi || (!tenure.months && !tenure.years)) {
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
  }, [haveInitialInvestment, initialInvestment, investment, roi, tenure]);

  return {
    isValidForm,
    resultsReady,
    initialInvestment,
    investment,
    yearlyInvestment: investment * 12,
    totalInvestment,
    roi,
    tenure,
    profit,
    maturityValue,
    timesMultiplied,
    haveInitialInvestment,
    setHaveInitialInvestment,
    calculate,
    handleInitialInvestmentChange,
    handleInvestmentChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  };
};
