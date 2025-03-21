"use client";

import { useMemo } from "react";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import { useLoanCalculator } from "@/hooks/Common/useLoanCalculator";
import { LoanCalculatorType } from "@/types/ConfigTypes";
import { LoanCalculatorProps } from "@/components/Loan/LoanCalculatorSummary";
import { AmortisationTableFrequency } from "@/types/Loan/LoanTypes";
import { useLoanAmortization } from "@/hooks/Loan/useLoanAmmortisation";
import LoanAmmortisation from "../LoanAmmortisation/LoanAmmortisation";
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
          />
        }
      />
      {isValidForm && (
        <>
          <LoanAmmortisation
            ammortisationData={yearlyAmortisationData}
            downloadAmmortisation={downloadAmmortisation}
            frequency={AmortisationTableFrequency.Yearly}
          />
          <LoanAmmortisation
            ammortisationData={monthlyAmortisationData}
            downloadAmmortisation={downloadAmmortisation}
            frequency={AmortisationTableFrequency.Monthly}
          />
        </>
      )}
    </div>
  );
};

export default CommonLoanCalculator;
