"use client";

import { AnalyticsEventType, trackEvent } from "@/helpers/analytics";
import { formatAmount } from "@/helpers/price";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const getCurrencySymbol = (currency: Currency) => {
  const symbols: Record<Currency, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CNY: "¥",
    CHF: "CHF",
    CAD: "C$",
    SGD: "S$",
    HKD: "HK$",
  };
  return symbols[currency] || currency;
};

const getCurrencyLocale = (currency: Currency) => {
  const locales: Record<Currency, string> = {
    INR: "en-IN", // India
    USD: "en-US", // United States
    EUR: "de-DE", // Germany (for Eurozone)
    GBP: "en-GB", // United Kingdom
    JPY: "ja-JP", // Japan
    AUD: "en-AU", // Australia
    CNY: "zh-CN", // China
    CHF: "de-CH", // Switzerland (German-speaking region)
    CAD: "en-CA", // Canada
    SGD: "en-SG", // Singapore
    HKD: "en-HK", // Hong Kong
  };
  return locales[currency] || "en-US"; // fallback to US English
};

export type Currency =
  | "AUD"
  | "CAD"
  | "CHF"
  | "CNY"
  | "EUR"
  | "GBP"
  | "HKD"
  | "INR"
  | "JPY"
  | "SGD"
  | "USD";

export type CurrencyState = {
  currency: Currency;
  currencySymbol: string;
  locale: string;
};
export type CurrencyAction = { type: "SET_CURRENCY"; payload: Currency };

export const currencyReducer = (
  state: CurrencyState,
  action: CurrencyAction
): CurrencyState => {
  switch (action.type) {
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
        currencySymbol: getCurrencySymbol(action.payload),
        locale: getCurrencyLocale(action.payload),
      };
    default:
      return state;
  }
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  currencySymbol: "$",
  isINR: false,
  setCurrency: () => {},
  formatAmount: (amount) => `$${amount.toLocaleString("en-US")}`,
});

type CurrencyContextType = {
  currency: Currency;
  currencySymbol: string;
  isINR: boolean;
  setCurrency: (currency: Currency) => void;
  formatAmount: (
    amount: number,
    decimals?: number,
    showSymbol?: boolean
  ) => string;
};

export const initialCurrencyState: CurrencyState = {
  currency: "USD",
  currencySymbol: "$",
  locale: "en-US",
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(currencyReducer, initialCurrencyState);

  const setCurrency = (currency: Currency) => {
    dispatch({ type: "SET_CURRENCY", payload: currency });
    localStorage.setItem("currency", currency);
    trackEvent(AnalyticsEventType.CHANGE_CURRENCY);
  };

  const formatAmountMemo = useCallback(
    (amount: number, decimals?: number, showSymbol?: boolean) =>
      formatAmount(amount, state.locale, state.currency, decimals, showSymbol),
    [state.currency, state.locale]
  );

  const detectCurrency = useCallback(async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const country = data.country_code as string; // e.g., "IN", "US"

      const countryToCurrency: Record<string, Currency> = {
        IN: "INR", // India
        US: "USD", // United States
        DE: "EUR", // Germany (Eurozone example)
        FR: "EUR", // France (another Eurozone country)
        GB: "GBP", // United Kingdom
        JP: "JPY", // Japan
        AU: "AUD", // Australia
        CN: "CNY", // China
        CH: "CHF", // Switzerland
        CA: "CAD", // Canada
        SG: "SGD", // Singapore
        HK: "HKD", // Hong Kong
      };

      const currency = countryToCurrency[country] || "USD";

      dispatch({ type: "SET_CURRENCY", payload: currency });
      localStorage.setItem("currency", currency);
    } catch (error) {
      console.error("Failed to detect location:", error);
      dispatch({ type: "SET_CURRENCY", payload: "USD" });
    }
  }, []);

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency") as Currency | null;
    if (storedCurrency) {
      dispatch({ type: "SET_CURRENCY", payload: storedCurrency });
    } else {
      detectCurrency();
    }
  }, [detectCurrency]);

  const contextValue = useMemo(
    () => ({
      ...state,
      setCurrency,
      formatAmount: formatAmountMemo,
      isINR: state.currency === "INR",
    }),
    [formatAmountMemo, state]
  );

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error(
      "useCurrencyProvider must be used inside <CurrencyProvider>"
    );
  }
  return context;
};
