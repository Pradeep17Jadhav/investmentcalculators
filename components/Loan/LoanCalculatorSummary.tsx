"use client";

import { Ref } from "react";
import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";
import { getPrintableMonthYear } from "../Common/LoanCalculator/helpers/loan";
import { AmortisationTableFrequency } from "@/types/Loan/LoanTypes";

import styles from "./LoanCalculatorSummary.module.css";

export type LoanCalculatorProps = {
  resultsReady: boolean;
  isValidForm: boolean;
  hasPrepayments: boolean;
  loanAmount: number;
  roi: string;
  totalPaid: number;
  principalPaid: number;
  interestPaid: number;
  prepayments: number;
  prepaymentSavings: number;
  timesMultiplied: number;
  emi: number;
  starts: number;
  ends: number;
  ref?: Ref<HTMLDivElement>;
};

const LoanCalculatorSummary = ({
  resultsReady,
  isValidForm,
  hasPrepayments,
  loanAmount,
  roi,
  totalPaid,
  principalPaid,
  interestPaid,
  prepaymentSavings,
  prepayments,
  timesMultiplied,
  emi,
  starts,
  ends,
  ref,
}: LoanCalculatorProps) => {
  return (
    <div className={styles.container}>
      <Section ref={ref} autoHeight>
        <AmountBanner amount={emi} prefix="EMI " />
      </Section>
      <Section title="Summary of Loan">
        {resultsReady && isValidForm && (
          <SummaryBlock title="Loan Details">
            <SummaryItem
              left="Loan Amount"
              right={`₹${formatPrice(resultsReady ? loanAmount : 0)}`}
            />
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
            left="Total Prepayments"
            right={`₹${formatPrice(prepayments)}`}
          />
          <SummaryItem
            left="Principal Payable"
            right={`₹${formatPrice(resultsReady ? principalPaid : 0)}`}
          />
          <SummaryItem
            left="Interest Payable"
            right={`₹${formatPrice(interestPaid)}`}
            loss
          />
          <SummaryItem
            left="Total Repayment"
            right={`₹${formatPrice(totalPaid)}`}
          />
          <SummaryItem
            left="Loan Amount Multiplied By"
            right={`${timesMultiplied} times`}
          />
          {hasPrepayments && (
            <SummaryItem
              left="Savings with Prepayments"
              right={`₹${formatPrice(prepaymentSavings, 0, 0)}`}
              profit
            />
          )}
        </SummaryBlock>
      </Section>
    </div>
  );
};

export default LoanCalculatorSummary;
