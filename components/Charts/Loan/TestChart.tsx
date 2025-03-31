"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  TooltipProps,
} from "recharts";

interface LoanProgressProps {
  loanAmount: number;
  interestPaid: number;
  prepayments: number;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;

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
      <p style={{ color: payload[0]?.color || "black" }}>
        ● Principal: <b>{formatPrice(payload[0]?.value || 0)}</b>
      </p>
      <p style={{ color: payload[1]?.color || "black" }}>
        ● Prepayments: <b>{formatPrice(payload[1]?.value || 0)}</b>
      </p>
      <p style={{ color: payload[2]?.color || "black" }}>
        ● Interest: <b>{formatPrice(payload[2]?.value || 0)}</b>
      </p>
    </div>
  );
};
const LoanProgressChart: React.FC<LoanProgressProps> = ({
  loanAmount,
  interestPaid,
  prepayments,
}) => {
  const total = loanAmount + interestPaid;
  const data = [
    {
      Principal: loanAmount,
      Prepayments: prepayments,
      Interest: interestPaid,
    },
  ];

  return (
    <div style={{ width: "100%", height: "20px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" hide domain={[0, total]} />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="Principal"
            stackId="a"
            fill="var(--highlight-color-blue)"
            radius={[10, 0, 0, 10]}
          />
          <Bar
            dataKey="Prepayments"
            stackId="a"
            fill="var(--highlight-color-green)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="Interest"
            stackId="a"
            fill="var(--loss)"
            radius={[0, 10, 10, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoanProgressChart;
