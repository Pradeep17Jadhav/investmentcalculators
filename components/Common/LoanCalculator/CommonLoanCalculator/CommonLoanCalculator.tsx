"use client";

import { useCallback, useMemo, useRef } from "react";
import TwoColumnContainer from "@/components/Common/TwoColumnContainer/TwoColumnContainer";
import { useLoanCalculator } from "@/hooks/Common/useLoanCalculator";
import { LoanCalculatorType } from "@/types/ConfigTypes";
import { LoanCalculatorProps } from "@/components/Loan/LoanCalculatorSummary";
import { useLoanAmortisation } from "@/hooks/Loan/useLoanAmortisation";
import LoanAmortisation from "../LoanAmortisation/LoanAmortisation";
import CommonLoanCalculatorInput from "../CommonLoanCalculatorInput/CommonLoanCalculatorInput";

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
    interest,
    timesPaid,
    emi,
    calculate,
    handleLoanAmountChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  } = useLoanCalculator({ loanCalculatorType });

  const {
    yearlyRowData: yearlyAmortisationData,
    monthlyRowData: monthlyAmortisationData,
    downloadAmortisation,
  } = useLoanAmortisation(loanAmount, roi, tenure);

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
      handleLoanAmountChange,
      handleROIChange,
      handleTenureYearsChange,
      handleTenureMonthsChange,
      handleCalculateBtnClick,
    ]
  );

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
            timesMultiplied={timesPaid}
            totalPaid={totalPaid}
            interest={interest}
            emi={emi}
            starts={monthlyAmortisationData[0]?.year}
            ends={
              monthlyAmortisationData[monthlyAmortisationData.length - 1]?.year
            }
          />
        }
      />
      {isValidForm && resultsReady && (
        <LoanAmortisation
          amortisationDataYearly={yearlyAmortisationData}
          amortisationDataMonthly={monthlyAmortisationData}
          downloadAmortisation={downloadAmortisation}
        />
      )}
    </div>
  );
};

export default CommonLoanCalculator;
