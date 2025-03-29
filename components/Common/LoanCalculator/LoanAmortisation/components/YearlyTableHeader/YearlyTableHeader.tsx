import { useCallback } from "react";
import { TableColumns } from "@/types/Loan/LoanTypes";
import { TableRow, TableCell, TableHead } from "@mui/material";
import { PREPAYMENTS_COLUMN_WIDTH, TableColumnKeys } from "../../../constants";

type Props = {
  columns: TableColumns;
};

const YearlyTableHeader = ({ columns }: Props) => {
  const getSX = useCallback((key: string) => {
    switch (key) {
      case TableColumnKeys.YEAR:
        return { width: "72px", padding: 0 };
      case TableColumnKeys.PREPAYMENTS:
        return { width: `${PREPAYMENTS_COLUMN_WIDTH}px` };
      default:
        return undefined;
    }
  }, []);

  return (
    <TableHead>
      <TableRow>
        {columns.map(({ key, label }) => (
          <TableCell key={key} align="right" sx={getSX(key)}>
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default YearlyTableHeader;
