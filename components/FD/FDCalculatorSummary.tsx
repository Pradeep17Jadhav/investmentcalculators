"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";

export type LumpsumCalculatorProps = {
  isValidForm: boolean;
  investment: number;
  profit: number;
  maturityValue: number;
  timesMultiplied: number;
};

const FDCalculatorSummary = ({
  isValidForm,
  investment,
  profit,
  maturityValue,
  timesMultiplied,
}: LumpsumCalculatorProps) => {
  return (
    <Section title="Summary of Returns">
      {isValidForm && (
        <SummaryBlock title="Investment Details">
          <SummaryItem
            left="Invested Amount"
            right={`₹${formatPrice(investment)}`}
          />
        </SummaryBlock>
      )}
      <SummaryBlock title="Profit Details">
        <SummaryItem left="Total Interest" right={`₹${formatPrice(profit)}`} />
        <SummaryItem
          left="Investment Multiplied"
          right={`${timesMultiplied} times`}
        />
      </SummaryBlock>
      <SummaryBlock title="Maturity Amount">
        <AmountBanner amount={maturityValue} />
      </SummaryBlock>
    </Section>
  );
};

export default FDCalculatorSummary;
