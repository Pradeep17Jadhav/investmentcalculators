import { useCallback } from "react";
import Section from "@/components/Section/Section";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import {
  AmortisationTableFrequency,
  AmortizationRow,
  TableColumn,
} from "@/types/Loan/LoanTypes";
import { useMediaQuery, useTheme } from "@mui/material";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import { desktopColumns, tabletColumns } from "../constants";
import { getCellValue } from "../helpers/loan";

import styles from "./LoanAmmortisation.module.css";

type Props = {
  ammortisationData: AmortizationRow[];
  downloadAmmortisation: (tableFrequency?: AmortisationTableFrequency) => void;
  frequency?: AmortisationTableFrequency;
};

const LoanAmmortisation = ({
  ammortisationData,
  downloadAmmortisation,
  frequency = AmortisationTableFrequency.Monthly,
}: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >900px
  const isMonthly = frequency === AmortisationTableFrequency.Monthly;
  const columns = isDesktop ? desktopColumns : tabletColumns;

  const handleAmortisationDownload = useCallback(() => {
    downloadAmmortisation(frequency);
  }, [downloadAmmortisation, frequency]);

  return (
    <Section
      title={`${isMonthly ? "Monthly" : "Yearly"} Amortisation Schedule`}
    >
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
                  {col.key === "year"
                    ? isMonthly
                      ? "Month"
                      : "Year"
                    : col.label}
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
                    {getCellValue(col, row, frequency)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LargeButton
        className={styles.downloadPdfBtn}
        onClick={handleAmortisationDownload}
        centered
      >
        Download Ammortisation PDF
      </LargeButton>
    </Section>
  );
};

export default LoanAmmortisation;
