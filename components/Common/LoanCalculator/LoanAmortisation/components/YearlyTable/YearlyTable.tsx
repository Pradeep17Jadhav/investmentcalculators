import { AmortisationRow, TableColumns } from "@/types/Loan/LoanTypes";
import { Table } from "@mui/material";
import YearlyTableHeader from "../YearlyTableHeader/YearlyTableHeader";
import YearlyTableBody from "../YearlyTableBody/YearlyTableBody";

import styles from "./YearlyTable.module.css";

type Props = {
  expandedRows: Set<number>;
  amortisationDataYearly: AmortisationRow[];
  amortisationDataMonthly: AmortisationRow[];
  columns: TableColumns;
  toggleRow: (year: number) => void;
};

const YearlyTable = ({
  expandedRows,
  amortisationDataYearly,
  amortisationDataMonthly,
  columns,
  toggleRow,
}: Props) => {
  return (
    <Table
      className={styles.table}
      size="small"
      sx={{
        backgroundColor: "transparent",
        tableLayout: "fixed",
        minWidth: "450px",
      }}
    >
      <YearlyTableHeader columns={columns} />
      <YearlyTableBody
        expandedRows={expandedRows}
        amortisationDataYearly={amortisationDataYearly}
        amortisationDataMonthly={amortisationDataMonthly}
        columns={columns}
        toggleRow={toggleRow}
      />
    </Table>
  );
};

export default YearlyTable;
