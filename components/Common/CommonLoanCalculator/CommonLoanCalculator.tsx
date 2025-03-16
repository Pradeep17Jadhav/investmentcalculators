"use client";

import { useMemo } from "react";
import CommonLoanCalculatorInput from "../CommonLoanCalculatorInput/CommonLoanCalculatorInput";
import TwoColumnContainer from "@/components/IncomeTax/TwoColumnContainer/TwoColumnContainer";
import { useLoanCalculator } from "@/hooks/Common/useLoanCalculator";
import { LoanCalculatorType } from "@/types/ConfigTypes";
import { LoanCalculatorProps } from "@/components/Loan/LoanCalculatorSummary";

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
    ></TwoColumnContainer>
  );
};

export default CommonLoanCalculator;
