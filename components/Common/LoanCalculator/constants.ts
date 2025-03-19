import { TableColumns } from "@/types/Loan/LoanTypes";

enum ColumnLabels {
  YEAR = "Year",
  PRINCIPAL = "Principal",
  INTEREST = "Interest",
  BALANCE = "Balance",
  TOTAL_PAYMENT = "Total Payment",
  LOAN_PAID_PERCENT = "Loan Paid %",
}

export const desktopColumns: TableColumns = [
  { key: "year", label: ColumnLabels.YEAR },
  { key: "principalPaid", label: ColumnLabels.PRINCIPAL },
  { key: "interestPaid", label: ColumnLabels.INTEREST },
  { key: "totalPaid", label: ColumnLabels.TOTAL_PAYMENT },
  { key: "balance", label: ColumnLabels.BALANCE },
  { key: "loanPaidPercent", label: ColumnLabels.LOAN_PAID_PERCENT },
];

export const tabletColumns: TableColumns = [
  { key: "year", label: ColumnLabels.YEAR },
  { key: "principalPaid", label: ColumnLabels.PRINCIPAL },
  { key: "interestPaid", label: ColumnLabels.INTEREST },
  { key: "balance", label: ColumnLabels.BALANCE },
];

export const columnsWithPrice = [
  "principalPaid",
  "interestPaid",
  "totalPaid",
  "balance",
];

