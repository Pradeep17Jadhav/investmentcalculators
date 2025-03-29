import { useCallback, useMemo } from "react";
import {
  AmortisationRow,
  AmortisationTableFrequency,
  TableColumns,
} from "@/types/Loan/LoanTypes";
import { TableRow, TableCell } from "@mui/material";
import { getCellValue } from "../../../helpers/loan";
import CellWithExpand from "../../../CellRenderers/CellWithExpand/CellWithExpand";

type Props = {
  yearlyRow: AmortisationRow;
  columns: TableColumns;
  isExpanded: boolean;
  toggleRow: (year: number) => void;
};

const YearlyTableRow = ({
  yearlyRow,
  columns,
  isExpanded,
  toggleRow,
}: Props) => {
  const memoizedValues = useMemo(
    () =>
      columns.map((col) => ({
        key: col.key,
        value: getCellValue(col, yearlyRow, AmortisationTableFrequency.Yearly),
      })),
    [columns, yearlyRow]
  );

  const renderCell = useCallback(
    ({ key, value }: { key: string; value: string | number }) =>
      key === "year" ? (
        <CellWithExpand
          key={key}
          value={value}
          toggleValue={yearlyRow.year}
          onToggle={toggleRow}
          isExpanded={isExpanded}
          align="right"
        />
      ) : (
        <TableCell
          key={key}
          sx={{ backgroundColor: "transparent" }}
          align="right"
        >
          {value}
        </TableCell>
      ),
    [yearlyRow.year, toggleRow, isExpanded]
  );

  return <TableRow>{memoizedValues.map(renderCell)}</TableRow>;
};

export default YearlyTableRow;
