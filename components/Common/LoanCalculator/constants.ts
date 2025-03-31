import { TableColumns } from "@/types/Loan/LoanTypes";

enum ColumnLabels {
  YEAR = "Year",
  PRINCIPAL = "Principal",
  PREPAYMENT = "Prepayment",
  INTEREST = "Interest",
  BALANCE = "Balance",
  TOTAL_PAYMENT = "Total Payment",
  LOAN_PAID_PERCENT = "Loan Paid %",
}

export const TableColumnKeys = {
  YEAR: "year",
  PRINCIPAL_PAID: "principalPaid",
  PREPAYMENTS: "prepayments",
  INTEREST_PAID: "interestPaid",
  TOTAL_PAID: "totalPaid",
  BALANCE: "balance",
  LOAN_PAID_PERCENT: "loanPaidPercent",
};

const desktopColumns: TableColumns = [
  { key: TableColumnKeys.YEAR, label: ColumnLabels.YEAR },
  { key: TableColumnKeys.PRINCIPAL_PAID, label: ColumnLabels.PRINCIPAL },
  { key: TableColumnKeys.PREPAYMENTS, label: ColumnLabels.PREPAYMENT },
  { key: TableColumnKeys.INTEREST_PAID, label: ColumnLabels.INTEREST },
  { key: TableColumnKeys.TOTAL_PAID, label: ColumnLabels.TOTAL_PAYMENT },
  { key: TableColumnKeys.BALANCE, label: ColumnLabels.BALANCE },
  {
    key: TableColumnKeys.LOAN_PAID_PERCENT,
    label: ColumnLabels.LOAN_PAID_PERCENT,
  },
];

export const getDesktopColumns = (hasPrepayments: boolean) => {
  return hasPrepayments
    ? desktopColumns
    : desktopColumns.filter((col) => col.key !== TableColumnKeys.PREPAYMENTS);
};

const tabletColumns: TableColumns = [
  { key: TableColumnKeys.YEAR, label: ColumnLabels.YEAR },
  { key: TableColumnKeys.PRINCIPAL_PAID, label: ColumnLabels.PRINCIPAL },
  { key: TableColumnKeys.PREPAYMENTS, label: ColumnLabels.PREPAYMENT },
  { key: TableColumnKeys.INTEREST_PAID, label: ColumnLabels.INTEREST },
  { key: TableColumnKeys.BALANCE, label: ColumnLabels.BALANCE },
];

export const getTabletColumns = (hasPrepayments: boolean) => {
  return hasPrepayments
    ? tabletColumns
    : tabletColumns.filter((col) => col.key !== TableColumnKeys.PREPAYMENTS);
};

export const columnsWithPrice = [
  TableColumnKeys.PRINCIPAL_PAID,
  TableColumnKeys.PREPAYMENTS,
  TableColumnKeys.INTEREST_PAID,
  TableColumnKeys.TOTAL_PAID,
  TableColumnKeys.BALANCE,
];

export const PREPAYMENTS_COLUMN_WIDTH = 120;
export const YEAR_COLUMN_WIDTH = 72;
