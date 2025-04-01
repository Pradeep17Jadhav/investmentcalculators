import { useCallback } from "react";
import {
  AmortisationRow,
  AmortisationTableFrequency,
  TableColumn,
  TableColumns,
} from "@/types/Loan/LoanTypes";
import { TableRow, TableCell, useMediaQuery, useTheme } from "@mui/material";
import { getCellValue } from "../../../helpers/loan";
import { PREPAYMENTS_COLUMN_WIDTH, TableColumnKeys } from "../../../constants";

type Props = {
  monthlyRow: AmortisationRow;
  columns: TableColumns;
};

const MonthlyTableRow = ({ monthlyRow, columns }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getSX = useCallback(
    (col: TableColumn) => {
      const common = {
        backgroundColor: "var(--background)",
        padding: "6px",
      };
      switch (col.key) {
        case TableColumnKeys.YEAR:
          return { ...common, width: isMobile ? "60px" : "72px", padding: 0 };
        case TableColumnKeys.PREPAYMENTS:
          return {
            ...common,
            width: `${PREPAYMENTS_COLUMN_WIDTH}px`,
          };
        default:
          return { ...common };
      }
    },
    [isMobile]
  );

  return (
    <TableRow key={monthlyRow.year}>
      {columns.map((col) => (
        <TableCell key={col.key} align="right" sx={getSX(col)}>
          {getCellValue(col, monthlyRow, AmortisationTableFrequency.Monthly)}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default MonthlyTableRow;
