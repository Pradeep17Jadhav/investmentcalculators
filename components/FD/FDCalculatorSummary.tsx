"use client";

import { Ref, useMemo } from "react";
import Section from "@/components/Section/Section";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";
import ProgressChart, { BarData } from "../Charts/ProgressChart";
import { useCurrency } from "@/contexts/currency";

import styles from "./FDCalculatorSummary.module.css";

export type FDCalculatorSummaryProps = {
  isValidForm: boolean;
  resultsReady: boolean;
  investment: number;
  profit: number;
  maturityValue: number;
  timesMultiplied: number;
  ref?: Ref<HTMLDivElement>;
};

const FDCalculatorSummary = ({
  isValidForm,
  resultsReady,
  investment,
  profit,
  maturityValue,
  timesMultiplied,
  ref,
}: FDCalculatorSummaryProps) => {
  const { formatAmount } = useCurrency();
  const barsData: BarData[] = useMemo(
    () => [
      {
        label: "Investment",
        fill: "var(--primary-blue)",
        value: investment,
      },
      {
        label: "Interest",
        fill: "var(--profit)",
        value: profit,
      },
    ],
    [investment, profit]
  );

  return (
    <div className={styles.container}>
      <Section title="Maturity Amount" ref={ref} autoHeight>
        <AmountBanner amount={maturityValue} />
      </Section>
      <Section title="Summary of Returns">
        <SummaryBlock title="Investment Details">
          <SummaryItem
            left="Invested Amount"
            right={formatAmount(investment)}
          />
        </SummaryBlock>
        {resultsReady && isValidForm && (
          <SummaryBlock title="Profit Details">
            <SummaryItem left="Total Interest" right={formatAmount(profit)} />
            <SummaryItem
              left="Investment Multiplied"
              right={`${timesMultiplied} times`}
            />
          </SummaryBlock>
        )}

        <ProgressChart
          show={resultsReady}
          id="fdCalculator"
          barsData={barsData}
        />
      </Section>
    </div>
  );
};

export default FDCalculatorSummary;
