import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  getUpdatedInterestRateWithValidation,
  getUpdatedNumberWithValidation,
} from "@/helpers/price";
import { Tenure, LoanCalculatorType } from "@/types/ConfigTypes";
import { sanitizeROI, toDecimal } from "@/helpers/numbers";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  MAX_LOAN_AMOUNT,
  MAX_ROI,
  MIN_LOAN_AMOUNT,
  MIN_ROI,
} from "@/constants/calculator";

type Props = {
  loanCalculatorType: LoanCalculatorType;
};

const initialTenure = {
  years: 0,
  months: 0,
  days: 0,
};

export const useLoanCalculator = ({ loanCalculatorType }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [resultsReady, setResultsReady] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [roi, setRoi] = useState("");
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState<Tenure>(initialTenure);
  const [interestPaid, setInterestPaid] = useState(0);
  const [timesPaid, setTimesPaid] = useState(0);

  const calculateHomeLoan = useCallback(() => {
    const monthlyRate = parseFloat(roi) / 12 / 100;
    const totalMonths = tenure.years * 12 + tenure.months;

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const timesPaid = totalPayment / loanAmount;

    setEmi(emi);
    setInterestPaid(Math.round(totalInterest));
    setIsValidForm(true);
    setLoanAmount(loanAmount);
    setTimesPaid(toDecimal(timesPaid));
    setTotalPayment(toDecimal(totalPayment));
    setRoi(roi);
    setTenure(tenure);
  }, [loanAmount, roi, tenure]);

  const calculate = useCallback(
    (valid?: boolean) => {
      if (!isValidForm && !valid) return;

      switch (loanCalculatorType) {
        case LoanCalculatorType.HOME: {
          calculateHomeLoan();
          break;
        }
        case LoanCalculatorType.CAR: {
          calculateHomeLoan();
          break;
        }
        case LoanCalculatorType.PERSONAL: {
          calculateHomeLoan();
          break;
        }
      }
      setResultsReady(true);
    },
    [calculateHomeLoan, isValidForm, loanCalculatorType]
  );

  const handleLoanAmountChange = useCallback(
    (
      e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      amount?: string
    ) => {
      const newInvestment = e?.target.value || amount || "0";
      setLoanAmount((currInvestment) =>
        getUpdatedNumberWithValidation(
          newInvestment,
          currInvestment,
          true,
          MIN_LOAN_AMOUNT,
          MAX_LOAN_AMOUNT
        )
      );
    },
    []
  );

  const handleROIChange = useCallback(
    (e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, roi?: string) => {
      const newROIInput = e?.target.value || roi || "0";
      const sanitizedROI = sanitizeROI(newROIInput);
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
      const newInvestmentPeriod = e?.target.value || months || "0";
      setTenure((tenure) => ({
        ...tenure,
        months: getUpdatedNumberWithValidation(
          newInvestmentPeriod,
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
    if (!loanAmount || !parseFloat(roi) || (!tenure.months && !tenure.years)) {
      setIsValidForm(false);
      setTotalPayment(0);
      setEmi(0);
      setInterestPaid(0);
      setTimesPaid(0);
      return;
    }
    setIsValidForm(true);
    if (!isMobile) {
      calculate(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, roi, tenure]);

  return {
    resultsReady,
    isValidForm,
    loanAmount,
    totalPaid: totalPayment,
    roi,
    tenure,
    interestPaid,
    timesPaid,
    emi,
    calculate,
    handleLoanAmountChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  };
};
