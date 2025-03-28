"use client";

import { Ref } from "react";
import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";

import styles from "./RDCalculatorSummary.module.css";

export type RDCalculatorSummaryProps = {
  isValidForm: boolean;
  resultsReady: boolean;
  investment: number;
  yearlyInvestment: number;
  totalInvestment: number;
  profit: number;
  maturityValue: number;
  timesMultiplied: number;
  ref?: Ref<HTMLDivElement>;
};

const RDCalculatorSummary = ({
  isValidForm,
  resultsReady,
  investment: monthlyInvestment,
  yearlyInvestment,
  totalInvestment,
  profit,
  maturityValue,
  timesMultiplied,
  ref,
}: RDCalculatorSummaryProps) => {
  return (
    <div className={styles.container}>
      <Section title="Maturity Amount" ref={ref} autoHeight>
        <AmountBanner amount={maturityValue} />
      </Section>
      <Section title="Summary of Returns">
        <SummaryBlock title="Investment Details">
          <SummaryItem
            left="Monthly Investment"
            right={`₹${formatPrice(monthlyInvestment)}`}
          />
          <SummaryItem
            left="Annual Investment"
            right={`₹${formatPrice(yearlyInvestment)}`}
          />
          <SummaryItem
            left="Total Investment"
            right={`₹${formatPrice(totalInvestment)}`}
          />
        </SummaryBlock>
        {resultsReady && isValidForm && (
          <SummaryBlock title="Profit Details">
            <SummaryItem
              left="Total Interest"
              right={`₹${formatPrice(profit)}`}
            />
            <SummaryItem
              left="Investment Multiplied"
              right={`${timesMultiplied} times`}
            />
          </SummaryBlock>
        )}
      </Section>
    </div>
  );
};

export default RDCalculatorSummary;
