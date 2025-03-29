import {
  AmortisationTableFrequency,
  AmortisationRow,
  TableColumn,
} from "../../../../types/Loan/LoanTypes";
import { formatPrice } from "@/helpers/price";
import { columnsWithPrice, TableColumnKeys } from "../constants";

export const getCellValue = (
  col: TableColumn,
  row: AmortisationRow,
  frequency: AmortisationTableFrequency
) => {
  if (columnsWithPrice.includes(col.key)) {
    return `₹${formatPrice(row[col.key as keyof AmortisationRow])}`;
  }
  if (col.key === TableColumnKeys.LOAN_PAID_PERCENT) {
    return `${row[col.key as keyof AmortisationRow].toFixed(2)}%`;
  }
  if (col.key === "year") {
    return getPrintableMonthYear(
      frequency,
      row[col.key as keyof AmortisationRow]
    );
  }

  return row[col.key as keyof AmortisationRow];
};

/**
 * Converts from YYYYMM i.e. 202503 to March 2025
 * @param frequency
 * @param YYYYMM
 * @returns
 */
export const getPrintableMonthYear = (
  frequency: AmortisationTableFrequency,
  YYYYMM: number,
  fullMonth: boolean = false
) => {
  const yearMonthStr = YYYYMM.toString();
  if (frequency === AmortisationTableFrequency.Yearly) {
    return yearMonthStr;
  }
  const monthStr = new Date(
    parseInt(yearMonthStr.substring(0, 4)),
    parseInt(yearMonthStr.substring(4, 6)) - 1
  ).toLocaleString("en-US", { month: "short", year: "numeric" });
  return fullMonth ? monthStr : monthStr.split(" ")[0];
};
