import { TableColumns } from "@/types/Loan/LoanTypes";
import { TableRow, TableCell, TableHead } from "@mui/material";

type Props = {
  columns: TableColumns;
};

const YearlyTableHeader = ({ columns }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ key, label }) => (
          <TableCell
            key={key}
            align="right"
            sx={key === "year" ? { width: "72px", padding: 0 } : undefined}
          >
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default YearlyTableHeader;
