"use client";

import { useCallback, useMemo, useRef } from "react";
import TwoColumnContainer from "@/components/Common/TwoColumnContainer/TwoColumnContainer";
import { useLoanCalculator } from "@/hooks/Loan/useLoanCalculator";
import { LoanCalculatorType } from "@/types/ConfigTypes";
import { LoanCalculatorProps } from "@/components/Loan/LoanCalculatorSummary";
import { useLoanAmortisation } from "@/hooks/Loan/useLoanAmortisation";
import LoanAmortisation from "../LoanAmortisation/LoanAmortisation";
import CommonLoanCalculatorInput from "../CommonLoanCalculatorInput/CommonLoanCalculatorInput";
import { usePrepayment } from "@/hooks/Loan/usePrepayments";
import { usePrepaymentsProvider } from "@/contexts/loan/prepaymentsContext";
import {
  LOAN_AMOUNT_STEP,
  MAX_LOAN_AMOUNT,
  MAX_ROI,
  MIN_LOAN_AMOUNT,
  MIN_ROI,
  ROI_STEP,
} from "@/constants/calculator";

import styles from "./CommonLoanCalculator.module.css";

type Props = {
  loanCalculatorType: LoanCalculatorType;
  Summary: React.ComponentType<LoanCalculatorProps>;
};

const CommonLoanCalculator = ({ loanCalculatorType, Summary }: Props) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const {
    resultsReady,
    isValidForm,
    loanAmount,
    totalPaid,
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
  } = useLoanCalculator({ loanCalculatorType });

  const { prepayments } = usePrepaymentsProvider();
  const { prepaymentsByMonth, hasPrepayments } = usePrepayment({
    prepayments,
    tenure,
  });

  const {
    yearlyRowData: yearlyAmortisationData,
    monthlyRowData: monthlyAmortisationData,
    downloadAmortisation,
    interestPaidActual,
    principalPaidActual,
    totalPrepayments,
    totalPaidActual,
    timesPaidActual,
  } = useLoanAmortisation(
    loanAmount,
    roi,
    tenure,
    prepaymentsByMonth,
    hasPrepayments
  );

  const handleCalculateBtnClick = useCallback(
    (valid?: boolean) => {
      calculate(valid);
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    },
    [calculate]
  );

  const input = useMemo(
    () => (
      <CommonLoanCalculatorInput
        loanCalculatorType={loanCalculatorType}
        loanAmount={loanAmount}
        roi={roi}
        tenure={tenure}
        isValidForm={isValidForm}
        minAmount={MIN_LOAN_AMOUNT}
        maxAmount={MAX_LOAN_AMOUNT}
        minRoi={MIN_ROI}
        maxRoi={MAX_ROI}
        stepAmount={LOAN_AMOUNT_STEP}
        stepRoi={ROI_STEP}
        calculate={handleCalculateBtnClick}
        handleLoanAmountChange={handleLoanAmountChange}
        handleROIChange={handleROIChange}
        handleTenureYearsChange={handleTenureYearsChange}
        handleTenureMonthsChange={handleTenureMonthsChange}
      />
    ),
    [
      loanCalculatorType,
      loanAmount,
      roi,
      tenure,
      isValidForm,
      handleCalculateBtnClick,
      handleLoanAmountChange,
      handleROIChange,
      handleTenureYearsChange,
      handleTenureMonthsChange,
    ]
  );

  const summaryLoanProps = {
    hasPrepayments,
    principalPaid: hasPrepayments ? principalPaidActual : loanAmount,
    timesMultiplied: hasPrepayments ? timesPaidActual : timesPaid,
    totalPaid: hasPrepayments ? totalPaidActual : totalPaid,
    interestPaid: hasPrepayments ? interestPaidActual : interestPaid,
    prepayments: hasPrepayments ? totalPrepayments : 0,
    starts: monthlyAmortisationData[0]?.year,
    ends: monthlyAmortisationData[monthlyAmortisationData.length - 1]?.year,
    prepaymentSavings: totalPaid - totalPaidActual,
  };

  return (
    <div className={styles.container}>
      <TwoColumnContainer
        leftColumn={input}
        rightColumn={
          <Summary
            ref={resultRef}
            resultsReady={resultsReady}
            isValidForm={isValidForm}
            loanAmount={loanAmount}
            roi={roi}
            emi={emi}
            {...summaryLoanProps}
          />
        }
      />
      {isValidForm && resultsReady && (
        <LoanAmortisation
          hasPrepayments={hasPrepayments}
          amortisationDataYearly={yearlyAmortisationData}
          amortisationDataMonthly={monthlyAmortisationData}
          downloadAmortisation={downloadAmortisation}
        />
      )}
    </div>
  );
};

export default CommonLoanCalculator;
