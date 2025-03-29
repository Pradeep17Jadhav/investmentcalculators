import {
  AmortisationRow,
  AmortisationTableFrequency,
  TableColumns,
} from "@/types/Loan/LoanTypes";
import { TableRow, TableCell } from "@mui/material";
import { getCellValue } from "../../../helpers/loan";

type Props = {
  monthlyRow: AmortisationRow;
  columns: TableColumns;
};

const MonthlyTableRow = ({ monthlyRow, columns }: Props) => {
  return (
    <TableRow key={monthlyRow.year}>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          align="right"
          sx={col.key === "year" ? { width: "72px", padding: 0 } : undefined}
        >
          {getCellValue(col, monthlyRow, AmortisationTableFrequency.Monthly)}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default MonthlyTableRow;
