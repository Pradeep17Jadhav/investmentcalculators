"use client";

import { useMemo } from "react";
import CommonLoanCalculatorInput from "../CommonLoanCalculatorInput/CommonLoanCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import { useLoanCalculator } from "@/hooks/Common/useLoanCalculator";
import { LoanCalculatorType } from "@/types/ConfigTypes";
import { LoanCalculatorProps } from "@/components/Loan/LoanCalculatorSummary";
import LoanAmmortisation from "../LoanAmmortisation/LoanAmmortisation";
import { useLoanAmortization } from "@/hooks/Loan/useLoanAmmortisation";

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
    handleTenureChange,
  } = useLoanCalculator({ loanCalculatorType });

  const { rowData: ammortisationData } = useLoanAmortization(
    loanAmount,
    roi,
    tenure.months
  );

  const input = useMemo(
    () => (
      <CommonLoanCalculatorInput
        loanCalculatorType={loanCalculatorType}
        handleLoanAmountChange={handleLoanAmountChange}
        handleROIChange={handleROIChange}
        handleTenureChange={handleTenureChange}
        loanAmount={loanAmount}
        roi={roi}
        tenure={tenure}
      />
    ),
    [
      handleLoanAmountChange,
      handleROIChange,
      handleTenureChange,
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
        <LoanAmmortisation ammortisationData={ammortisationData} />
      )}
    </div>
  );
};

export default CommonLoanCalculator;
