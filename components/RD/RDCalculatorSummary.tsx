"use client";

import { Ref, useMemo } from "react";
import Section from "@/components/Section/Section";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";
import ProgressChart, { BarData } from "../Charts/ProgressChart";
import { useCurrency } from "@/contexts/currency";

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
  const { formatAmount } = useCurrency();

  const barsData: BarData[] = useMemo(
    () => [
      {
        label: "Total Investment",
        fill: "var(--primary-blue)",
        value: totalInvestment,
      },
      {
        label: "Interest",
        fill: "var(--profit)",
        value: profit,
      },
    ],
    [profit, totalInvestment]
  );

  return (
    <div className={styles.container}>
      <Section title="Maturity Amount" ref={ref} autoHeight>
        <AmountBanner amount={maturityValue} />
      </Section>
      <Section title="Summary of Returns">
        <SummaryBlock title="Investment Details">
          <SummaryItem
            left="Monthly Investment"
            right={formatAmount(monthlyInvestment)}
          />
          <SummaryItem
            left="Annual Investment"
            right={formatAmount(yearlyInvestment)}
          />
          <SummaryItem
            left="Total Investment"
            right={formatAmount(totalInvestment)}
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
          id="rdCalculator"
          barsData={barsData}
        />
      </Section>
    </div>
  );
};

export default RDCalculatorSummary;
