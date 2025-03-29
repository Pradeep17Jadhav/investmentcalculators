import { useCallback } from "react";
import {
  AmortisationRow,
  AmortisationTableFrequency,
  TableColumn,
  TableColumns,
} from "@/types/Loan/LoanTypes";
import { TableRow, TableCell } from "@mui/material";
import { getCellValue } from "../../../helpers/loan";
import { PREPAYMENTS_COLUMN_WIDTH, TableColumnKeys } from "../../../constants";

type Props = {
  monthlyRow: AmortisationRow;
  columns: TableColumns;
};

const MonthlyTableRow = ({ monthlyRow, columns }: Props) => {
  const getSX = useCallback((col: TableColumn) => {
    switch (col.key) {
      case TableColumnKeys.YEAR:
        return { width: "72px", padding: 0 };
      case TableColumnKeys.PREPAYMENTS:
        return { width: `${PREPAYMENTS_COLUMN_WIDTH}px` };
      default:
        return undefined;
    }
  }, []);

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
