"use client";

import { Ref, useMemo } from "react";
import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";
import ProgressChart, { BarData } from "../Charts/ProgressChart";

import styles from "./SIPCalculatorSummary.module.css";

export type SIPCalculatorSummaryProps = {
  isValidForm: boolean;
  resultsReady: boolean;
  monthlyInvestment: number;
  yearlyInvestment: number;
  totalInvestment: number;
  profit: number;
  maturityValue: number;
  timesMultiplied: number;
  ref?: Ref<HTMLDivElement>;
};

const SIPCalculatorSummary = ({
  isValidForm,
  resultsReady,
  monthlyInvestment,
  yearlyInvestment,
  totalInvestment,
  profit,
  maturityValue,
  timesMultiplied,
  ref,
}: SIPCalculatorSummaryProps) => {
  const barsData: BarData[] = useMemo(
    () => [
      {
        label: "Total Investment",
        fill: "var(--primary)",
        value: totalInvestment,
      },
      {
        label: "Profit",
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
              left="Total Profit"
              right={`₹${formatPrice(profit)}`}
            />
            <SummaryItem
              left="Investment Multiplied"
              right={`${timesMultiplied} times`}
            />
          </SummaryBlock>
        )}

        <ProgressChart
          show={resultsReady}
          id="sipCalculator"
          barsData={barsData}
        />
      </Section>
    </div>
  );
};

export default SIPCalculatorSummary;
