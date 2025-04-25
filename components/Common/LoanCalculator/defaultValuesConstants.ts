import { Currency } from "@/contexts/currency";

export const getHomeLoanAmount = (currency: Currency): number => {
  switch (currency) {
    case "AUD":
      return 500000;
    case "CAD":
      return 500000;
    case "CHF":
      return 1000000;
    case "CNY":
      return 2000000;
    case "EUR":
      return 250000;
    case "GBP":
      return 200000;
    case "HKD":
      return 2000000;
    case "INR":
      return 5000000;
    case "JPY":
      return 35000000;
    case "SGD":
      return 1000000;
    case "USD":
      return 500000;
    default:
      return 0;
  }
};

export const getHomeLoanRoi = (currency: Currency): string => {
  switch (currency) {
    case "INR":
      return "8";
    case "USD":
      return "6.5";
    case "EUR":
      return "4";
    case "GBP":
      return "5.5";
    case "JPY":
      return "1";
    case "AUD":
      return "6";
    case "CNY":
      return "4.5";
    case "CHF":
      return "2";
    case "CAD":
      return "5.5";
    case "SGD":
      return "3.5";
    case "HKD":
      return "3.5";
    default:
      return "5";
  }
};

export const getPersonalLoanAmount = (currency: Currency): number => {
  switch (currency) {
    case "INR":
      return 500000;
    case "USD":
      return 15000;
    case "EUR":
      return 12000;
    case "GBP":
      return 10000;
    case "JPY":
      return 800000;
    case "AUD":
      return 10000;
    case "CNY":
      return 80000;
    case "CHF":
      return 12000;
    case "CAD":
      return 12000;
    case "SGD":
      return 10000;
    case "HKD":
      return 100000;
    default:
      return 0;
  }
};

export const getPersonalLoanRoi = (currency: Currency): string => {
  switch (currency) {
    case "INR":
      return "12";
    case "USD":
      return "11";
    case "EUR":
      return "10";
    case "GBP":
      return "10.5";
    case "JPY":
      return "7";
    case "AUD":
      return "10";
    case "CNY":
      return "8";
    case "CHF":
      return "6";
    case "CAD":
      return "9";
    case "SGD":
      return "7.5";
    case "HKD":
      return "8.5";
    default:
      return "10";
  }
};
