"use client";

import { useCallback } from "react";
import { formatPrice } from "@/helpers/price";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  TooltipProps,
  Legend,
} from "recharts";

type CustomTooltipProps = TooltipProps<number, string> & {
  barsData: BarData[];
};

const CustomTooltip = ({ active, payload, barsData }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        background: "white",
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        color: "black",
      }}
    >
      {barsData.map(({ value, label, fill }) => (
        <p key={label} style={{ color: fill }}>
          {`● ${label}:`}
          <b>{`₹${formatPrice(value || 0)}`}</b>
        </p>
      ))}
    </div>
  );
};

export type BarData = {
  label: string;
  fill: string;
  value: number;
};

interface LoanProgressProps {
  id: string;
  barsData: BarData[];
  show?: boolean;
}

const ProgressChart = ({ id, barsData, show = true }: LoanProgressProps) => {
  const total = barsData.reduce((sum, { value }) => value + sum, 0);
  const data = [
    Object.fromEntries(barsData.map(({ label, value }) => [label, value])),
  ];

  const getBar = useCallback(
    ({ label, fill }: BarData, index: number) => {
      const isFirst = index === 0;
      const isLast = index === barsData.length - 1;
      const radius: [number, number, number, number] = isFirst
        ? [10, 0, 0, 10]
        : isLast
        ? [0, 10, 10, 0]
        : [0, 0, 0, 0];
      return (
        <Bar
          key={label}
          dataKey={label}
          stackId={id}
          fill={fill ?? "var(--primary)"}
          radius={radius}
        />
      );
    },
    [barsData.length, id]
  );

  if (!show) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "48px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" hide domain={[0, total]} />
          <YAxis type="category" dataKey="name" hide />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ fontSize: "13px" }}
          />
          <Tooltip
            content={<CustomTooltip barsData={barsData} />}
            cursor={{ fill: "transparent" }}
          />
          {barsData.map(getBar)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
