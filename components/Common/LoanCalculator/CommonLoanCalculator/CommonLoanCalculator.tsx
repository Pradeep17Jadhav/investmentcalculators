"use client";

import { useMemo } from "react";
import TwoColumnContainer from "@/components/Common/TwoColumnContainer/TwoColumnContainer";
import { useLoanCalculator } from "@/hooks/Common/useLoanCalculator";
import { LoanCalculatorType } from "@/types/ConfigTypes";
import { LoanCalculatorProps } from "@/components/Loan/LoanCalculatorSummary";
import { useLoanAmortization } from "@/hooks/Loan/useLoanAmmortisation";
import LoanAmortisation from "../LoanAmmortisation/LoanAmmortisation";
import CommonLoanCalculatorInput from "../CommonLoanCalculatorInput/CommonLoanCalculatorInput";

import styles from "./CommonLoanCalculator.module.css";

type Props = {
  loanCalculatorType: LoanCalculatorType;
  Summary: React.ComponentType<LoanCalculatorProps>;
};

const CommonLoanCalculator = ({ loanCalculatorType, Summary }: Props) => {
  const {
    isValidForm,
    loanAmount,
    totalPaid,
    roi,
    tenure,
    interest,
    timesPaid,
    emi,
    handleLoanAmountChange,
    handleROIChange,
    handleTenureYearsChange,
    handleTenureMonthsChange,
  } = useLoanCalculator({ loanCalculatorType });

  const {
    yearlyRowData: yearlyAmortisationData,
    monthlyRowData: monthlyAmortisationData,
    downloadAmmortisation,
  } = useLoanAmortization(loanAmount, roi, tenure);

  const input = useMemo(
    () => (
      <CommonLoanCalculatorInput
        loanCalculatorType={loanCalculatorType}
        handleLoanAmountChange={handleLoanAmountChange}
        handleROIChange={handleROIChange}
        handleTenureYearsChange={handleTenureYearsChange}
        handleTenureMonthsChange={handleTenureMonthsChange}
        loanAmount={loanAmount}
        roi={roi}
        tenure={tenure}
      />
    ),
    [
      handleLoanAmountChange,
      handleROIChange,
      handleTenureYearsChange,
      handleTenureMonthsChange,
      loanAmount,
      loanCalculatorType,
      roi,
      tenure,
    ]
  );

  return (
    <div className={styles.container}>
      <TwoColumnContainer
        leftColumn={input}
        rightColumn={
          <Summary
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
      {isValidForm && (
        <>
          <LoanAmortisation
            ammortisationDataYearly={yearlyAmortisationData}
            ammortisationDataMonthly={monthlyAmortisationData}
            downloadAmmortisation={downloadAmmortisation}
          />
        </>
      )}
    </div>
  );
};

export default CommonLoanCalculator;
