"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";

export type LoanCalculatorProps = {
  isValidForm: boolean;
  loanAmount: number;
  roi: string;
  totalPaid: number;
  interest: number;
  timesMultiplied: number;
  emi: number;
};
const LoanCalculatorSummary = ({
  isValidForm,
  loanAmount,
  roi,
  totalPaid,
  interest,
  timesMultiplied,
  emi,
}: LoanCalculatorProps) => {
  return (
    <Section title="Summary of Loan">
      {isValidForm && (
        <SummaryBlock title="Loan Details">
          <SummaryItem
            left="Principal Amount"
            right={`₹${formatPrice(loanAmount)}`}
          />
          <SummaryItem left="Rate of Interest" right={`${roi}%`} />
        </SummaryBlock>
      )}
      <SummaryBlock title="Repayment Details">
        <SummaryItem
          left="Total Interest"
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
