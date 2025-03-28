"use client";

import { Ref } from "react";
import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";

import styles from "./LumpsumCalculatorSummary.module.css";

export type LumpsumCalculatorSummaryProps = {
  isValidForm: boolean;
  resultsReady: boolean;
  investment: number;
  profit: number;
  maturityValue: number;
  timesMultiplied: number;
  ref?: Ref<HTMLDivElement>;
};

const LumpsumCalculatorSummary = ({
  isValidForm,
  resultsReady,
  investment,
  profit,
  maturityValue,
  timesMultiplied,
  ref,
}: LumpsumCalculatorSummaryProps) => {
  return (
    <div className={styles.container}>
      <Section title="Maturity Amount" ref={ref} autoHeight>
        <AmountBanner amount={maturityValue} />
      </Section>
      <Section title="Summary of Returns">
        <SummaryBlock title="Investment Details">
          <SummaryItem
            left="Lumpsum Investment"
            right={`₹${formatPrice(investment)}`}
          />
        </SummaryBlock>
        {resultsReady && isValidForm && (
          <SummaryBlock title="Profit Details">
            <SummaryItem
              left="Total Profit"
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

export default LumpsumCalculatorSummary;
