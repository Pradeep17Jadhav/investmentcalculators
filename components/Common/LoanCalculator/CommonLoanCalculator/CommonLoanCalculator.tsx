"use client";

import { useMemo } from "react";
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

  const input = useMemo(
    () => (
      <CommonLoanCalculatorInput
        loanCalculatorType={loanCalculatorType}
        loanAmount={loanAmount}
        roi={roi}
        tenure={tenure}
        isValidForm={isValidForm}
        calculate={calculate}
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
      calculate,
      handleLoanAmountChange,
      handleROIChange,
      handleTenureYearsChange,
      handleTenureMonthsChange,
    ]
  );

  return (
    <div className={styles.container}>
      <TwoColumnContainer
        leftColumn={input}
        rightColumn={
          <Summary
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
