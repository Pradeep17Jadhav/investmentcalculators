export const toDecimal = (num: number, decimals: number = 2) =>
  Number(num.toFixed(decimals));

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

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value);
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};
