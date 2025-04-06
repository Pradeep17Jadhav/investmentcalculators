"use client";

import { Ref, useMemo } from "react";
import Section from "@/components/Section/Section";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";
import ProgressChart, { BarData } from "../Charts/ProgressChart";
import { useCurrency } from "@/contexts/currency";

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
  const { formatAmount } = useCurrency();

  const barsData: BarData[] = useMemo(
    () => [
      {
        label: "Lumpsum Investment",
        fill: "var(--primary)",
        value: investment,
      },
      {
        label: "Profit",
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
            left="Lumpsum Investment"
            right={formatAmount(investment)}
          />
        </SummaryBlock>

        {resultsReady && isValidForm && (
          <SummaryBlock title="Profit Details">
            <SummaryItem left="Total Profit" right={formatAmount(profit)} />
            <SummaryItem
              left="Investment Multiplied"
              right={`${timesMultiplied} times`}
            />
          </SummaryBlock>
        )}

        <ProgressChart
          show={resultsReady}
          id="lumpsumCalculator"
          barsData={barsData}
        />
      </Section>
    </div>
  );
};

export default LumpsumCalculatorSummary;
