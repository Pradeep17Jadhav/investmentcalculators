export const formatPrice = (price: number, minimumFractionDigits?: number) => {
  return price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits:
      minimumFractionDigits === undefined ? 0 : minimumFractionDigits,
  });
};

export const convertPriceToInt = (price: string) =>
  parseInt(price.replace(/,/g, ""), 10);

export const isInputStringAValidNumber = (amount: string) =>
  Number.isFinite(parseInt(amount));

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

export const getUpdatedInterestRateWithValidation = (
  newNumber: string,
  originalNumber: string,
  min: number = 0,
  max: number = 100
): string => {
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
    return originalNumber || "0";
  }
  if (parseFloat(newNumber) < min) {
    return min.toString();
  }
  if (parseFloat(newNumber) > max) {
    return max.toString();
  }
  return newNumber;
};
