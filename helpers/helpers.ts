/**
 * converts months count to year and month
 * 29 => 2 Years, 5 Months
 * @param months
 * @returns
 */
export const getMonthsToYearMonths = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const yearStr = years > 0 ? `${years} Year${years > 1 ? "s" : ""}` : "";
  const monthStr =
    remainingMonths > 0
      ? `${remainingMonths} Month${remainingMonths > 1 ? "s" : ""}`
      : "";

  return [yearStr, monthStr].filter(Boolean).join(", ");
};
