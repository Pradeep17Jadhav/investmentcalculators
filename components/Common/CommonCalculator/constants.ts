import {
  MAX_INVESTMENT,
  MAX_MONTHLY_INVESTMENT,
  MIN_INVESTMENT,
  MIN_MONTHLY_INVESTMENT,
} from "@/constants/calculator";
import { CalculatorType } from "@/types/ConfigTypes";

export const getInitialInvestmentScale = () => {
  return getOneTimeInvestmentScale;
};

export const getInvestmentScale = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.FD:
    case CalculatorType.LUMPSUM:
      return getOneTimeInvestmentScale;
    case CalculatorType.RD:
    case CalculatorType.SIP:
      return getMonthlyInvestmentScale;
  }
};

export const getOneTimeInvestmentScale = (value: number) => {
  if (value <= 50) return value * 1000; // ₹1K steps up to ₹50k
  if (value <= 55) return 50000 + (value - 50) * 10000; // ₹10k steps up to ₹1L
  if (value <= 59) return 100000 + (value - 55) * 25000; // ₹25K steps up to ₹2L
  if (value <= 65) return 200000 + (value - 59) * 50000; // ₹50K steps up to ₹5L
  if (value <= 70) return 500000 + (value - 65) * 100000; // ₹1L steps up to ₹10L
  if (value <= 79) return 1000000 + (value - 70) * 1000000; // ₹10L steps up to ₹1Cr
  if (value <= 88) return 10000000 + (value - 79) * 10000000; // ₹1Cr steps up to ₹10Cr
  return 100000000 + (value - 88) * 100000000; // ₹10Cr steps beyond
};

export const getMonthlyInvestmentScale = (value: number) => {
  if (value <= 40) return value * 500; // ₹1K steps up to ₹20k
  if (value <= 120) return 20000 + (value - 40) * 1000; // ₹1k steps up to ₹1L
  if (value <= 130) return 100000 + (value - 120) * 10000; // ₹10K steps up to ₹2L
  if (value <= 142) return 200000 + (value - 130) * 25000; // ₹25K steps up to ₹5L
  if (value <= 152) return 500000 + (value - 142) * 50000; // ₹50K steps up to ₹10L
  return 1000000 + (value - 152) * 100000; // ₹1L steps beyond
};

export const getInitialInvestmentInverseScale = () => {
  return getOneTimeInvestmentInverseScale;
};

export const getInvestmentInverseScale = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.FD:
    case CalculatorType.LUMPSUM:
      return getOneTimeInvestmentInverseScale;
    case CalculatorType.RD:
    case CalculatorType.SIP:
      return getMonthlyInvestmentInverseScale;
  }
};

export const getOneTimeInvestmentInverseScale = (value: number) => {
  if (value <= 50000) return value / 1000;
  if (value <= 100000) return 50 + (value - 50000) / 10000;
  if (value <= 200000) return 55 + (value - 100000) / 25000;
  if (value <= 500000) return 59 + (value - 200000) / 50000;
  if (value <= 1000000) return 65 + (value - 500000) / 100000;
  if (value <= 10000000) return 70 + (value - 1000000) / 1000000;
  if (value <= 100000000) return 79 + (value - 10000000) / 10000000;
  return 88 + (value - 100000000) / 100000000;
};

export const getMonthlyInvestmentInverseScale = (value: number) => {
  if (value <= 20000) return value / 500;
  if (value <= 100000) return 40 + (value - 20000) / 1000;
  if (value <= 200000) return 120 + (value - 100000) / 10000;
  if (value <= 500000) return 130 + (value - 200000) / 25000;
  if (value <= 1000000) return 142 + (value - 500000) / 50000;
  return 152 + (value - 1000000) / 100000;
};

export const getInitialInvestmentMax = () => {
  return getOneTimeInvestmentMax();
};

export const getInvestmentMax = (calculatorType: CalculatorType) => {
  switch (calculatorType) {
    case CalculatorType.FD:
    case CalculatorType.LUMPSUM:
      return getOneTimeInvestmentMax();
    case CalculatorType.RD:
    case CalculatorType.SIP:
      return getMonthlyInvestmentMax();
  }
};

export const getOneTimeInvestmentMax = () => {
  let value = MIN_INVESTMENT;
  while (true) {
    const investment = getOneTimeInvestmentScale(value);
    if (investment >= MAX_INVESTMENT) {
      return value;
    }
    value++;
  }
};

export const getMonthlyInvestmentMax = () => {
  let value = MIN_MONTHLY_INVESTMENT;
  while (true) {
    const investment = getMonthlyInvestmentScale(value);
    if (investment >= MAX_MONTHLY_INVESTMENT) {
      return value;
    }
    value++;
  }
};
