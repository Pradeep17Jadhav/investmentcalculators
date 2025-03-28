import { Fragment, useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Section from "@/components/Section/Section";
import {
  AmortisationTableFrequency,
  AmortisationRow,
} from "@/types/Loan/LoanTypes";
import { desktopColumns, tabletColumns } from "../constants";
import { getCellValue } from "../helpers/loan";
import SmallButton from "@/components/Buttons/SmallButton/SmallButton";
import styles from "./LoanAmortisation.module.css";
import CellWithExpand from "../CellRenderers/CellWithExpand/CellWithExpand";

type Props = {
  amortisationDataYearly: AmortisationRow[];
  amortisationDataMonthly: AmortisationRow[];
  downloadAmortisation: (tableFrequency?: AmortisationTableFrequency) => void;
  frequency?: AmortisationTableFrequency;
};
const LoanAmortisation = ({
  amortisationDataYearly,
  amortisationDataMonthly,
  downloadAmortisation,
}: Props) => {
  const theme = useTheme();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >900px
  const columns = isDesktop ? desktopColumns : tabletColumns;

  const toggleRow = (year: number) => {
    setExpandedRows((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(year)) {
        newExpanded.delete(year);
      } else {
        newExpanded.add(year);
      }
      return newExpanded;
    });
  };

  const getMonthlyDataForYear = (year: number) => {
    return amortisationDataMonthly.filter(
      (row) => Math.floor(row.year / 100) === year
    );
  };

  const handleAmortisationDownload = useCallback(
    (frequency: AmortisationTableFrequency) => () =>
      downloadAmortisation(frequency),
    [downloadAmortisation]
  );

  return (
    <Section title="Loan Amortisation Schedule">
      <TableContainer>
        <Table
          className={styles.table}
          size="small"
          sx={{
            backgroundColor: "transparent",
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map(({ key, label }) => (
                <TableCell
                  key={key}
                  align="right"
                  sx={
                    key === "year" ? { width: "72px", padding: 0 } : undefined
                  }
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {amortisationDataYearly.map((yearlyRow) => {
              const monthlyData = getMonthlyDataForYear(yearlyRow.year);
              const isExpanded = expandedRows.has(yearlyRow.year);
              return (
                <Fragment key={yearlyRow.year}>
                  <TableRow key={yearlyRow.year}>
                    {columns.map((col) => {
                      const value = getCellValue(
                        col,
                        yearlyRow,
                        AmortisationTableFrequency.Yearly
                      );
                      if (col.key === "year") {
                        return (
                          <CellWithExpand
                            key={col.key}
                            value={value}
                            toggleValue={yearlyRow.year}
                            onToggle={toggleRow}
                            isExpanded={isExpanded}
                            align="right"
                          ></CellWithExpand>
                        );
                      } else {
                        return (
                          <TableCell
                            key={col.key}
                            sx={{
                              backgroundColor: "transparent",
                            }}
                            align="right"
                          >
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={columns.length} style={{ padding: 0 }}>
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Table
                          className={styles.collapsibleTable}
                          size="small"
                          sx={{ tableLayout: "fixed" }}
                        >
                          <TableHead className={styles.hiddenHeader}>
                            <TableRow>
                              {columns.map(({ key, label }) => (
                                <TableCell
                                  key={key}
                                  align="right"
                                  sx={
                                    key === "year"
                                      ? { width: "72px", padding: 0 }
                                      : undefined
                                  }
                                >
                                  {label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {monthlyData.map((monthlyRow) => (
                              <TableRow key={monthlyRow.year}>
                                {columns.map((col) => (
                                  <TableCell
                                    key={col.key}
                                    align="right"
                                    sx={
                                      col.key === "year"
                                        ? { width: "72px", padding: 0 }
                                        : undefined
                                    }
                                  >
                                    {getCellValue(
                                      col,
                                      monthlyRow,
                                      AmortisationTableFrequency.Monthly
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SmallButton
        className={styles.downloadPdfBtn}
        onClick={handleAmortisationDownload(AmortisationTableFrequency.Yearly)}
        centered
      >
        Download Yearly Amortisation PDF
      </SmallButton>
      <SmallButton
        className={styles.downloadPdfBtn}
        onClick={handleAmortisationDownload(AmortisationTableFrequency.Monthly)}
        centered
      >
        Download Monthly Amortisation PDF
      </SmallButton>
    </Section>
  );
};

export default LoanAmortisation;
