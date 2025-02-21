export const formatPrice = (price: number, minimumFractionDigits?: number) => {
  return price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits:
      minimumFractionDigits === undefined ? 0 : minimumFractionDigits,
  });
};

export const convertPriceToInt = (price: string) =>
  parseInt(price.replace(/,/g, ""), 10);
