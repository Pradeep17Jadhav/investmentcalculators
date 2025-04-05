import { MAX_LOAN_AMOUNT } from "@/constants/calculator";

export const getLoanAmountScale = (value: number) => {
  if (value <= 100) return value * 100000; // ₹1L steps up to ₹1 Cr
  if (value <= 120) return 10000000 + (value - 100) * 500000; // ₹5L steps up to ₹2 Cr
  if (value <= 130) return 20000000 + (value - 120) * 1000000; // ₹10L steps up to ₹3 Cr
  if (value <= 144) return 30000000 + (value - 130) * 5000000; // ₹50L steps up to ₹10 Cr
  return 100000000 + (value - 144) * 100000000; // ₹10 Cr steps beyond
};

export const getLoanAmountInverseScale = (value: number) => {
  if (value <= 10000000) return value / 100000;
  if (value <= 20000000) return 100 + (value - 10000000) / 500000;
  if (value <= 30000000) return 120 + (value - 20000000) / 1000000;
  if (value <= 100000000) return 130 + (value - 30000000) / 5000000;
  return 144 + (value - 100000000) / 100000000;
};

export const getLoanMax = () => {
  let value = 0;
  while (true) {
    const loanAmount = getLoanAmountScale(value);
    if (loanAmount >= MAX_LOAN_AMOUNT) {
      return value;
    }
    value++;
  }
};
