import { Currency } from "@/contexts/currency";

/**
 * Formats a number as a price in the Indian number system (en-IN locale).
 *
 * - Uses comma separators as per the Indian numbering format.
 * - Limits decimal places to a maximum of 2.
 * - Allows specifying a minimum number of decimal places.
 */
export const formatPrice = (
  price: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2
): string => {
  return price.toLocaleString("en-IN", {
    maximumFractionDigits,
    minimumFractionDigits,
  });
};

/**
 * Converts a formatted price string into an integer by removing commas.
 *
 * - Strips out commas from the input string.
 * - Parses the cleaned string into an integer using base 10.
 */
export const convertPriceToInt = (price: string) =>
  parseInt(price.replace(/,/g, ""), 10);

export const isInputStringAValidNumber = (amount: string) =>
  Number.isFinite(parseInt(amount));

/**
 * Validates and updates a numeric input while ensuring it stays within the allowed range.
 *
 * - If the input is not a valid number, it returns the original value or `0`.
 * - If `isPrice` is `true`, the input is converted to an integer price format.
 * - Ensures the value stays within the provided `min` and `max` limits.
 * - Defaults to parsing as an integer if `isPrice` is not specified.
 */
export const getUpdatedNumberWithValidation = (
  newNumber: string,
  originalNumber?: number,
  isPrice?: boolean,
  min: number = -Infinity,
  max: number = Infinity
): number => {
  const isValid = isInputStringAValidNumber(newNumber);
  if (!isValid) {
    return originalNumber || 0;
  }
  const updatedNumber = isPrice
    ? convertPriceToInt(newNumber)
    : parseInt(newNumber);
  if (updatedNumber < min) {
    return min;
  }
  if (updatedNumber > max) {
    return max;
  }
  return updatedNumber;
};

/**
 * Validates and updates an interest rate input while ensuring it stays within the allowed range.
 *
 * - If the input is not a valid number, it returns the original value or "0".
 * - Allows incomplete decimal inputs (e.g., "12.") without resetting.
 * - Ensures the value stays within the provided `min` and `max` limits.
 * - Supports both integer and decimal values.
 */
export const getUpdatedInterestRateWithValidation = (
  newNumber: string,
  originalNumber: string,
  min: number = 0,
  max: number = 100
): string => {
  if (newNumber === "") return newNumber;
  const decimalSplit = newNumber.split(",");
  const isDecimal = decimalSplit.length === 2;
  const isValid =
    isInputStringAValidNumber(newNumber) ||
    (isDecimal &&
      isInputStringAValidNumber(decimalSplit[0]) &&
      isInputStringAValidNumber(decimalSplit[1]));

  if (!isValid) {
    const isIncompleteDecimal =
      decimalSplit.length === 1 && newNumber[newNumber.length - 1] === ".";
    if (isIncompleteDecimal) {
      return newNumber;
    }
    return originalNumber || "";
  }
  if (parseFloat(newNumber) < min) {
    return min.toString();
  }
  if (parseFloat(newNumber) > max) {
    return max.toString();
  }
  return newNumber;
};

export const formatAmount = (
  amount: number,
  locale: string,
  currency: Currency,
  decimals?: number,
  showSymbol: boolean = true
) => {
  return new Intl.NumberFormat(locale, {
    style: showSymbol ? "currency" : "decimal",
    currency,
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 0,
  }).format(amount);
};
