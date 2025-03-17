import Section from "@/components/Section/Section";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import { AmortizationRow } from "@/types/Loan/LoanTypes";
import { formatPrice } from "@/helpers/price";
import { useMediaQuery, useTheme } from "@mui/material";
import { useCallback } from "react";

import styles from "./LoanAmmortisation.module.css";

type TableColumn = {
  key: string;
  label: string;
};
type TableColumns = TableColumn[];

enum ColumnLabels {
  YEAR = "Year",
  PRINCIPAL = "Principal",
  INTEREST = "Interest",
  BALANCE = "Balance",
  TOTAL_PAYMENT = "Total Payment",
  LOAN_PAID_PERCENT = "Loan Paid %",
}

type Props = {
  ammortisationData: AmortizationRow[];
};

const LoanAmmortisation = ({ ammortisationData }: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >900px

  const desktopColumns: TableColumns = [
    { key: "year", label: ColumnLabels.YEAR },
    { key: "principalPaid", label: ColumnLabels.PRINCIPAL },
    { key: "interestPaid", label: ColumnLabels.INTEREST },
    { key: "totalPaid", label: ColumnLabels.TOTAL_PAYMENT },
    { key: "balance", label: ColumnLabels.BALANCE },
    { key: "loanPaidPercent", label: ColumnLabels.LOAN_PAID_PERCENT },
  ];

  const tabletColumns: TableColumns = [
    { key: "year", label: ColumnLabels.YEAR },
    { key: "principalPaid", label: ColumnLabels.PRINCIPAL },
    { key: "interestPaid", label: ColumnLabels.INTEREST },
    { key: "balance", label: ColumnLabels.BALANCE },
  ];

  const columns = isDesktop ? desktopColumns : tabletColumns;

  const getCellValue = useCallback((col: TableColumn, row: AmortizationRow) => {
    const columnsWithPrice = [
      "principalPaid",
      "interestPaid",
      "totalPaid",
      "balance",
    ];
    if (columnsWithPrice.includes(col.key)) {
      return `₹${formatPrice(row[col.key as keyof AmortizationRow])}`;
    }
    if (col.key === "loanPaidPercent") {
      return `${row[col.key as keyof AmortizationRow].toFixed(2)}%`;
    }
    return row[col.key as keyof AmortizationRow];
  }, []);

  return (
    <Section title="Amortisation Schedule">
      <TableContainer>
        <Table
          className={styles.table}
          size="small"
          sx={{ backgroundColor: "transparent" }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.key === "year" ? "left" : "right"}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ammortisationData.map((row) => (
              <TableRow key={row.year}>
                {columns.map((col: TableColumn) => (
                  <TableCell
                    key={col.key}
                    align={col.key === "year" ? "left" : "right"}
                    sx={{ backgroundColor: "transparent" }}
                  >
                    {getCellValue(col, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default LoanAmmortisation;
