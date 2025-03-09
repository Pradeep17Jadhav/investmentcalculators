"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import SummaryBlock from "@/components/Summary/SummaryBlock/SummaryBlock";
import SummaryItem from "@/components/Summary/SummaryItem/SummaryItem";
import AmountBanner from "@/components/Summary/AmountBanner/AmountBanner";

type Props = {
  isValidForm: boolean;
  lumpsumInvestment: number;
  profit: number;
  maturityValue: number;
  timesMultiplied: number;
};

const LumpsumCalculatorSummary = ({
  isValidForm,
  lumpsumInvestment,
  profit,
  maturityValue,
  timesMultiplied,
}: Props) => {
  return (
    <Section title="Summary of Returns">
      {isValidForm && (
        <SummaryBlock title="Investment Details">
          <SummaryItem
            left="Lumpsum Investment"
            right={`₹${formatPrice(lumpsumInvestment)}`}
          />
        </SummaryBlock>
      )}
      <SummaryBlock title="Profit Details">
        <SummaryItem left="Total Profit" right={`₹${formatPrice(profit)}`} />
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

export default LumpsumCalculatorSummary;
