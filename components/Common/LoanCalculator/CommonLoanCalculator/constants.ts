import {
  MAX_LOAN_AMOUNT_CAD,
  MAX_LOAN_AMOUNT_AUD,
  MAX_LOAN_AMOUNT_CHF,
  MAX_LOAN_AMOUNT_CNY,
  MAX_LOAN_AMOUNT_EUR,
  MAX_LOAN_AMOUNT_GBP,
  MAX_LOAN_AMOUNT_HKD,
  MAX_LOAN_AMOUNT_INR,
  MAX_LOAN_AMOUNT_JPY,
  MAX_LOAN_AMOUNT_SGD,
  MAX_LOAN_AMOUNT_USD,
} from "@/constants/calculator";
import { Currency } from "@/contexts/currency";

export const getLoanAmountScaleByCurrency = (currency: Currency) => {
  switch (currency) {
    case "INR":
      return getLoanAmountScaleINR;
    case "AUD":
      return getLoanAmountScaleAUD;
    case "CAD":
      return getLoanAmountScaleCAD;
    case "CHF":
      return getLoanAmountScaleCHF;
    case "CNY":
      return getLoanAmountScaleCNY;
    case "EUR":
      return getLoanAmountScaleEUR;
    case "GBP":
      return getLoanAmountScaleGBP;
    case "HKD":
      return getLoanAmountScaleHKD;
    case "JPY":
      return getLoanAmountScaleJPY;
    case "SGD":
      return getLoanAmountScaleSGD;
    case "USD":
      return getLoanAmountScaleUSD;
    default:
      return getLoanAmountScaleINR;
  }
};

const getLoanAmountScaleUSD = (value: number) => {
  if (value <= 100) return value * 10000; // 10k steps up to 10 lakh
  if (value <= 120) return 1000000 + (value - 100) * 50000; // ₹50k steps up to 20 lakh
  if (value <= 130) return 2000000 + (value - 120) * 100000; // ₹1L steps up to 30 lakh
  if (value <= 144) return 3000000 + (value - 130) * 500000; // ₹5L steps up to 1 crore
  return 10000000 + (value - 144) * 10000000; // 1 crore steps beyond
};

const getLoanAmountInverseScaleUSD = (value: number) => {
  if (value <= 1000000) return value / 10000;
  if (value <= 2000000) return 100 + (value - 1000000) / 50000;
  if (value <= 3000000) return 120 + (value - 2000000) / 100000;
  if (value <= 10000000) return 130 + (value - 3000000) / 500000;
  return 144 + (value - 10000000) / 10000000;
};

const getLoanAmountScaleAUD = getLoanAmountScaleUSD;
const getLoanAmountInverseScaleAUD = getLoanAmountInverseScaleUSD;

const getLoanAmountScaleCAD = getLoanAmountScaleUSD;
const getLoanAmountInverseScaleCAD = getLoanAmountInverseScaleUSD;

const getLoanAmountScaleEUR = (value: number) => {
  if (value <= 100) return value * 10000; // 10k steps up to 10 lakh
  if (value <= 120) return 1000000 + (value - 100) * 50000; // 50k steps up to 20 lakh
  if (value <= 130) return 2000000 + (value - 120) * 100000; // 1L steps up to 30 lakh
  if (value <= 144) return 3000000 + (value - 130) * 500000; // 5L steps up to 1 crore
  return 10000000 + (value - 144) * 10000000; // 1 Cr steps beyond
};

const getLoanAmountInverseScaleEUR = (value: number) => {
  if (value <= 1000000) return value / 10000;
  if (value <= 2000000) return 100 + (value - 1000000) / 50000;
  if (value <= 3000000) return 120 + (value - 2000000) / 100000;
  if (value <= 10000000) return 130 + (value - 3000000) / 500000;
  return 144 + (value - 10000000) / 10000000;
};

const getLoanAmountScaleGBP = (value: number) => {
  if (value <= 40) return value * 5000; // 5k steps up to 2 lakh
  if (value <= 90) return 200000 + (value - 40) * 10000; // 10k steps up to 7 lakh
  if (value <= 136) return 700000 + (value - 90) * 50000; // 50k steps up to 30 lakh
  if (value <= 150) return 3000000 + (value - 136) * 500000; // 5L steps up to 1 crore
  return 10000000 + (value - 150) * 1000000; // 1 Cr steps beyond
};

const getLoanAmountInverseScaleGBP = (value: number) => {
  if (value <= 200000) return value / 5000;
  if (value <= 700000) return 40 + (value - 200000) / 10000;
  if (value <= 3000000) return 90 + (value - 700000) / 50000;
  if (value <= 10000000) return 136 + (value - 3000000) / 500000;
  return 150 + (value - 10000000) / 1000000;
};

const getLoanAmountScaleJPY = (value: number) => {
  if (value <= 100) return value * 500000; // ₹5L steps up to ₹5 Cr
  if (value <= 120) return 50000000 + (value - 100) * 2500000; // ₹25L steps up to ₹10 Cr
  if (value <= 140) return 100000000 + (value - 120) * 5000000; // ₹50L steps up to ₹20 Cr
  if (value <= 170) return 200000000 + (value - 140) * 10000000; // ₹1Cr steps up to ₹50 Cr
  return 500000000 + (value - 170) * 100000000; // ₹10 Cr steps beyond
};

const getLoanAmountInverseScaleJPY = (value: number) => {
  if (value <= 50000000) return value / 500000;
  if (value <= 100000000) return 100 + (value - 50000000) / 2500000;
  if (value <= 200000000) return 120 + (value - 100000000) / 5000000;
  if (value <= 500000000) return 140 + (value - 200000000) / 10000000;
  return 170 + (value - 500000000) / 100000000;
};

const getLoanAmountScaleCHF = (value: number) => {
  if (value <= 80) return value * 25000; // 25k steps up to 20 lakh
  if (value <= 120) return 2000000 + (value - 80) * 50000; // 50k steps up to 40 lakh
  if (value <= 140) return 4000000 + (value - 120) * 100000; // ₹1L steps up to 60 lakh
  if (value <= 148) return 6000000 + (value - 140) * 500000; // ₹5L steps up to 1 crore
  return 10000000 + (value - 148) * 5000000; // 50 lakh steps beyond
};

const getLoanAmountInverseScaleCHF = (value: number) => {
  if (value <= 2000000) return value / 25000;
  if (value <= 4000000) return 80 + (value - 2000000) / 50000;
  if (value <= 6000000) return 120 + (value - 4000000) / 100000;
  if (value <= 10000000) return 140 + (value - 6000000) / 500000;
  return 148 + (value - 10000000) / 5000000;
};

const getLoanAmountScaleSGD = getLoanAmountScaleCHF;
const getLoanAmountInverseScaleSGD = getLoanAmountInverseScaleCHF;

const getLoanAmountScaleHKD = (value: number) => {
  if (value <= 80) return value * 25000; // 25k steps up to ₹20 lakh
  if (value <= 100) return 2000000 + (value - 80) * 50000; // 50k steps up to 30 lakh
  if (value <= 170) return 3000000 + (value - 100) * 100000; // 1L steps up to 1 Cr
  if (value <= 190) return 10000000 + (value - 130) * 500000; // 5L steps up to ₹2 Cr
  return 20000000 + (value - 190) * 10000000; // ₹1 crore steps beyond
};

const getLoanAmountInverseScaleHKD = (value: number) => {
  if (value <= 2000000) return value / 25000;
  if (value <= 3000000) return 80 + (value - 2000000) / 50000;
  if (value <= 10000000) return 100 + (value - 3000000) / 100000;
  if (value <= 20000000) return 170 + (value - 10000000) / 500000;
  return 190 + (value - 20000000) / 10000000;
};

const getLoanAmountScaleINR = (value: number) => {
  if (value <= 100) return value * 100000; // ₹1L steps up to ₹1 Cr
  if (value <= 120) return 10000000 + (value - 100) * 500000; // ₹5L steps up to ₹2 Cr
  if (value <= 130) return 20000000 + (value - 120) * 1000000; // ₹10L steps up to ₹3 Cr
  if (value <= 144) return 30000000 + (value - 130) * 5000000; // ₹50L steps up to ₹10 Cr
  return 100000000 + (value - 144) * 100000000; // ₹10 Cr steps beyond
};

const getLoanAmountInverseScaleINR = (value: number) => {
  if (value <= 10000000) return value / 100000;
  if (value <= 20000000) return 100 + (value - 10000000) / 500000;
  if (value <= 30000000) return 120 + (value - 20000000) / 1000000;
  if (value <= 100000000) return 130 + (value - 30000000) / 5000000;
  return 144 + (value - 100000000) / 100000000;
};

const getLoanAmountScaleCNY = getLoanAmountInverseScaleINR;
const getLoanAmountInverseScaleCNY = getLoanAmountInverseScaleINR;

export const getLoanAmountInverseScaleByCurrency = (currency: Currency) => {
  switch (currency) {
    case "AUD":
      return getLoanAmountInverseScaleAUD;
    case "CAD":
      return getLoanAmountInverseScaleCAD;
    case "CHF":
      return getLoanAmountInverseScaleCHF;
    case "CNY":
      return getLoanAmountInverseScaleCNY;
    case "EUR":
      return getLoanAmountInverseScaleEUR;
    case "GBP":
      return getLoanAmountInverseScaleGBP;
    case "HKD":
      return getLoanAmountInverseScaleHKD;
    case "INR":
      return getLoanAmountInverseScaleINR;
    case "JPY":
      return getLoanAmountInverseScaleJPY;
    case "SGD":
      return getLoanAmountInverseScaleSGD;
    case "USD":
      return getLoanAmountInverseScaleUSD;
    default:
      return getLoanAmountInverseScaleINR;
  }
};

export const getLoanMaxByCurrency = (currency: Currency) => {
  const maxAmount = getMaxLoanAmountByCurrency(currency);
  switch (currency) {
    case "AUD":
      return getLoanMax(maxAmount, getLoanAmountScaleAUD);
    case "CAD":
      return getLoanMax(maxAmount, getLoanAmountScaleCAD);
    case "CHF":
      return getLoanMax(maxAmount, getLoanAmountScaleCHF);
    case "CNY":
      return getLoanMax(maxAmount, getLoanAmountScaleCNY);
    case "EUR":
      return getLoanMax(maxAmount, getLoanAmountScaleEUR);
    case "GBP":
      return getLoanMax(maxAmount, getLoanAmountScaleGBP);
    case "HKD":
      return getLoanMax(maxAmount, getLoanAmountScaleHKD);
    case "INR":
      return getLoanMax(maxAmount, getLoanAmountScaleINR);
    case "JPY":
      return getLoanMax(maxAmount, getLoanAmountScaleJPY);
    case "SGD":
      return getLoanMax(maxAmount, getLoanAmountScaleSGD);
    case "USD":
      return getLoanMax(maxAmount, getLoanAmountScaleUSD);
    default:
      return getLoanMax(maxAmount, getLoanAmountScaleINR);
  }
};

export const getMaxLoanAmountByCurrency = (currency: Currency) => {
  switch (currency) {
    case "AUD":
      return MAX_LOAN_AMOUNT_AUD;
    case "CAD":
      return MAX_LOAN_AMOUNT_CAD;
    case "CHF":
      return MAX_LOAN_AMOUNT_CHF;
    case "CNY":
      return MAX_LOAN_AMOUNT_CNY;
    case "EUR":
      return MAX_LOAN_AMOUNT_EUR;
    case "GBP":
      return MAX_LOAN_AMOUNT_GBP;
    case "HKD":
      return MAX_LOAN_AMOUNT_HKD;
    case "INR":
      return MAX_LOAN_AMOUNT_INR;
    case "JPY":
      return MAX_LOAN_AMOUNT_JPY;
    case "SGD":
      return MAX_LOAN_AMOUNT_SGD;
    case "USD":
      return MAX_LOAN_AMOUNT_USD;
    default:
      return MAX_LOAN_AMOUNT_INR;
  }
};

export const getLoanMax = (
  maxLoanAmount: number,
  getLoanAmountScale: (value: number) => number
) => {
  let value = 0;
  while (true) {
    const loanAmount = getLoanAmountScale(value);
    if (loanAmount >= maxLoanAmount) {
      return value;
    }
    value++;
  }
};
