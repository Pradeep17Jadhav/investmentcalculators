export const toDecimal = (num: number, decimals?: number) =>
  parseFloat(num.toFixed(decimals || 2));
