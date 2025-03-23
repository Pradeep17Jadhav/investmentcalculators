import { useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Section from "@/components/Section/Section";
import {
  AmortisationTableFrequency,
  AmortizationRow,
} from "@/types/Loan/LoanTypes";
import { desktopColumns, tabletColumns } from "../constants";
import { getCellValue } from "../helpers/loan";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import styles from "./LoanAmmortisation.module.css";

type Props = {
  ammortisationDataYearly: AmortizationRow[];
  ammortisationDataMonthly: AmortizationRow[];
  downloadAmmortisation: (tableFrequency?: AmortisationTableFrequency) => void;
  frequency?: AmortisationTableFrequency;
};
const LoanAmortisation = ({
  ammortisationDataYearly,
  ammortisationDataMonthly,
  downloadAmmortisation,
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
    return ammortisationDataMonthly.filter(
      (row) => Math.floor(row.year / 100) === year
    );
  };

  const handleAmortisationDownload = useCallback(
    (frequency: AmortisationTableFrequency) => () =>
      downloadAmmortisation(frequency),
    [downloadAmmortisation]
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
              <TableCell
                sx={{
                  width: "32px",
                  padding: 0,
                }}
              />
              {columns.map(({ key, label }) => (
                <TableCell key={key} align="right">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ammortisationDataYearly.map((yearlyRow) => {
              const monthlyData = getMonthlyDataForYear(yearlyRow.year);
              const isExpanded = expandedRows.has(yearlyRow.year);
              return (
                <>
                  <TableRow key={yearlyRow.year}>
                    <TableCell
                      sx={{
                        backgroundColor: "transparent",
                        width: "32px",
                        padding: 0,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => toggleRow(yearlyRow.year)}
                      >
                        {isExpanded ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        sx={{
                          backgroundColor: "transparent",
                        }}
                        align="right"
                      >
                        {getCellValue(
                          col,
                          yearlyRow,
                          AmortisationTableFrequency.Yearly
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      style={{ padding: 0 }}
                    >
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Table
                          className={styles.table}
                          size="small"
                          sx={{ tableLayout: "fixed" }}
                        >
                          <TableHead className={styles.hiddenHeader}>
                            <TableRow>
                              <TableCell
                                sx={{
                                  width: "32px",
                                  padding: 0,
                                }}
                              />
                              {columns.map(({ key, label }) => (
                                <TableCell key={key}>{label}</TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {monthlyData.map((monthlyRow) => (
                              <TableRow key={monthlyRow.year}>
                                <TableCell
                                  style={{
                                    width: "32px",
                                  }}
                                />
                                {columns.map((col) => (
                                  <TableCell key={col.key} align="right">
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
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <LargeButton
        className={styles.downloadPdfBtn}
        onClick={handleAmortisationDownload(AmortisationTableFrequency.Yearly)}
        centered
      >
        Download Yearly Amortisation PDF
      </LargeButton>
      <LargeButton
        className={styles.downloadPdfBtn}
        onClick={handleAmortisationDownload(AmortisationTableFrequency.Monthly)}
        centered
      >
        Download Monthly Amortisation PDF
      </LargeButton>
    </Section>
  );
};

export default LoanAmortisation;
