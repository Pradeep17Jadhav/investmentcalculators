export const toDecimal = (num: number, decimals?: number) =>
  parseFloat(num.toFixed(decimals || 2));

export const sanitizeROI = (roi: string) => {
  const validROI = roi.replace(/[^0-9.]/g, "").replace(/^(\d*\.\d*)\./g, "$1");

  const isDecimal = validROI.indexOf(".") !== -1;
  if (isDecimal) {
    const splits = validROI.split(".");
    const decimal = splits[1].slice(0, 2);
    return `${splits[0]}.${decimal}`;
  }
  return validROI;
};
