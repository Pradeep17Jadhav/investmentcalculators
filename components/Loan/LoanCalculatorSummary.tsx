"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";
import { getPrintableMonthYear } from "../Common/LoanCalculator/helpers/loan";
import { AmortisationTableFrequency } from "@/types/Loan/LoanTypes";

export type LoanCalculatorProps = {
  resultsReady: boolean;
  isValidForm: boolean;
  loanAmount: number;
  roi: string;
  totalPaid: number;
  interest: number;
  timesMultiplied: number;
  emi: number;
  starts: number;
  ends: number;
};

const LoanCalculatorSummary = ({
  resultsReady,
  isValidForm,
  loanAmount,
  roi,
  totalPaid,
  interest,
  timesMultiplied,
  emi,
  starts,
  ends,
}: LoanCalculatorProps) => {
  return (
    <Section title="Summary of Loan">
      {resultsReady && isValidForm && (
        <SummaryBlock title="Loan Details">
          <SummaryItem left="Rate of Interest" right={`${roi}%`} />
          <SummaryItem
            left="Start Date"
            right={getPrintableMonthYear(
              AmortisationTableFrequency.Monthly,
              starts,
              true
            )}
          />
          <SummaryItem
            left="End Date"
            right={getPrintableMonthYear(
              AmortisationTableFrequency.Monthly,
              ends,
              true
            )}
          />
        </SummaryBlock>
      )}
      <SummaryBlock title="Repayment Details">
        <SummaryItem
          left="Principal Amount"
          right={`₹${formatPrice(resultsReady ? loanAmount : 0)}`}
        />
        <SummaryItem
          left="Interest Payable"
          right={`₹${formatPrice(interest)}`}
        />
        <SummaryItem
          left="Total Payment"
          right={`₹${formatPrice(totalPaid)}`}
        />
        <SummaryItem
          left="Loan Amount Multiplied By"
          right={`${timesMultiplied} times`}
        />
      </SummaryBlock>
      <SummaryBlock title="EMI">
        <AmountBanner amount={emi} />
      </SummaryBlock>
    </Section>
  );
};

export default LoanCalculatorSummary;
