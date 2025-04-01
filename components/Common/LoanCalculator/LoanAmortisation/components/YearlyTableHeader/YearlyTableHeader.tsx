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
      const common = {
        padding: "6px",
      };
      switch (key) {
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
