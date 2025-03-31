import { useCallback } from "react";
import { TableColumns } from "@/types/Loan/LoanTypes";
import {
  TableRow,
  TableCell,
  TableHead,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PREPAYMENTS_COLUMN_WIDTH, TableColumnKeys } from "../../../constants";

type Props = {
  columns: TableColumns;
};

const YearlyTableHeader = ({ columns }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getSX = useCallback(
    (key: string) => {
      switch (key) {
        case TableColumnKeys.YEAR:
          return { width: isMobile ? "60px" : "72px", padding: 0 };
        case TableColumnKeys.PREPAYMENTS:
          return {
            width: `${PREPAYMENTS_COLUMN_WIDTH}px`,
            padding: "6px",
          };
        default:
          return { padding: "6px" };
      }
    },
    [isMobile]
  );

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
