"use client";

import { Ref, useMemo } from "react";
import { ToWords } from "to-words";
import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";
import { getPrintableMonthYear } from "../Common/LoanCalculator/helpers/loan";
import { AmortisationTableFrequency } from "@/types/Loan/LoanTypes";
import { toDecimal } from "@/helpers/numbers";
import ProgressChart, { BarData } from "../Charts/ProgressChart";

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
  const toWords = new ToWords();

  const barsData: BarData[] = useMemo(
    () => [
      {
        label: "Loan Amount",
        fill: "var(--profit)",
        value: loanAmount,
      },
      {
        label: "Prepayments",
        fill: "var(--primary)",
        value: prepayments,
      },
      {
        label: "Interest",
        fill: "var(--loss)",
        value: interestPaid,
      },
    ],
    [interestPaid, loanAmount, prepayments]
  );

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
            tooltip={toWords.convert(prepayments)}
          />
          <SummaryItem
            left="Principal Payable"
            right={`₹${formatPrice(resultsReady ? principalPaid : 0)}`}
            tooltip={toWords.convert(principalPaid)}
          />
          <SummaryItem
            left="Interest Payable"
            right={`₹${formatPrice(interestPaid)}`}
            loss={!!interestPaid}
            tooltip={toWords.convert(interestPaid)}
          />
          <SummaryItem
            left="Total Repayment"
            right={`₹${formatPrice(totalPaid, 0, 0)}`}
            tooltip={toWords.convert(totalPaid)}
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
              tooltip={toWords.convert(toDecimal(prepaymentSavings, 0))}
            />
          )}
        </SummaryBlock>
        <ProgressChart
          show={resultsReady}
          id="loanCalculator"
          barsData={barsData}
        />
      </Section>
    </div>
  );
};

export default LoanCalculatorSummary;
