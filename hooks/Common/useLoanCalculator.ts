import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  getUpdatedInterestRateWithValidation,
  getUpdatedNumberWithValidation,
} from "@/helpers/price";
import { InvestmentPeriod, LoanCalculatorType } from "@/types/ConfigTypes";
import { sanitizeROI, toDecimal } from "@/helpers/numbers";

type Props = {
  loanCalculatorType: LoanCalculatorType;
};

const initialTenure = {
  years: 0,
  months: 0,
  days: 0,
};

export const useLoanCalculator = ({ loanCalculatorType }: Props) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [roi, setRoi] = useState("");
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState<InvestmentPeriod>(initialTenure);
  const [interest, setInterest] = useState(0);
  const [timesPaid, setTimesPaid] = useState(0);

  const calculateHomeLoan = useCallback(() => {
    const monthlyRate = parseFloat(roi) / 12 / 100;
    const totalMonths = tenure.months;

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const timesPaid = totalPayment / loanAmount;

    setEmi(emi);
    setInterest(Math.round(totalInterest));
    setIsValidForm(true);
    setLoanAmount(loanAmount);
    setTimesPaid(toDecimal(timesPaid));
    setTotalPayment(toDecimal(totalPayment));
    setRoi(roi);
    setTenure(tenure);
  }, [loanAmount, roi, tenure]);

  const calculate = useCallback(() => {
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
  }, [calculateHomeLoan, loanCalculatorType]);

  const handleLoanAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newInvestment = e.target.value || "0";
      setLoanAmount((currInvestment) =>
        getUpdatedNumberWithValidation(
          newInvestment,
          currInvestment,
          true,
          0,
          1000000000
        )
      );
    },
    []
  );

  const handleROIChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newROIInput = e.target.value || "0";
      const sanitizedROI = sanitizeROI(newROIInput);
      setRoi((currROI) =>
        getUpdatedInterestRateWithValidation(sanitizedROI, currROI)
      );
    },
    []
  );

  const handleTenureChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newInvestmentPeriod = e.target.value || "0";
      setTenure((investmentPeriod) => ({
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
    if (!loanAmount || !parseFloat(roi) || !tenure.months) {
      setIsValidForm(false);
      setTotalPayment(0);
      setEmi(0);
      setInterest(0);
      setTimesPaid(0);
      return;
    }
    setIsValidForm(true);
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, roi, tenure]);

  return {
    isValidForm,
    loanAmount,
    totalPaid: totalPayment,
    roi,
    tenure,
    interest,
    timesPaid,
    emi,
    handleLoanAmountChange,
    handleROIChange,
    handleTenureChange,
  };
};
