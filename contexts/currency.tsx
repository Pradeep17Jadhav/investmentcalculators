"use client";

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
  };
  return symbols[currency] || currency;
};

const getCurrencyLocale = (currency: Currency) => {
  const locales: Record<Currency, string> = {
    INR: "en-IN",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    JPY: "ja-JP",
    AUD: "en-AU",
  };
  return locales[currency] || "en-IN";
};

export type Currency = "INR" | "USD" | "EUR" | "GBP" | "JPY" | "AUD";
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
  setCurrency: () => {},
  formatAmount: (amount) => `$${amount.toLocaleString("en-US")}`,
});

type CurrencyContextType = {
  currency: Currency;
  currencySymbol: string;
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
        IN: "INR",
        US: "USD",
        DE: "EUR",
        GB: "GBP",
        JP: "JPY",
        AU: "AUD",
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
    () => ({ ...state, setCurrency, formatAmount: formatAmountMemo }),
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
