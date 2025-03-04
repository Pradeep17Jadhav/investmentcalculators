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
  isFloat?: boolean
): number => {
  const isValid = isInputStringAValidNumber(newNumber);
  if (!isValid) {
    return originalNumber || 0;
  }
  return isPrice
    ? convertPriceToInt(newNumber)
    : isFloat
    ? parseFloat(newNumber)
    : parseInt(newNumber);
};
