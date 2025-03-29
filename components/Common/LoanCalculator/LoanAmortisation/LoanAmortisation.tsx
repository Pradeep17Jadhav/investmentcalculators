import { useCallback, useEffect, useState } from "react";
import { TableContainer, useMediaQuery, useTheme } from "@mui/material";
import Section from "@/components/Section/Section";
import {
  AmortisationTableFrequency,
  AmortisationRow,
} from "@/types/Loan/LoanTypes";
import { getDesktopColumns, getTabletColumns } from "../constants";
import SmallButton from "@/components/Buttons/SmallButton/SmallButton";
import YearlyTable from "./components/YearlyTable/YearlyTable";

import styles from "./LoanAmortisation.module.css";

type Props = {
  hasPrepayments: boolean;
  amortisationDataYearly: AmortisationRow[];
  amortisationDataMonthly: AmortisationRow[];
  downloadAmortisation: (tableFrequency?: AmortisationTableFrequency) => void;
  frequency?: AmortisationTableFrequency;
};
const LoanAmortisation = ({
  hasPrepayments,
  amortisationDataYearly,
  amortisationDataMonthly,
  downloadAmortisation,
}: Props) => {
  const theme = useTheme();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >900px
  const columns = isDesktop
    ? getDesktopColumns(hasPrepayments)
    : getTabletColumns(hasPrepayments);

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

  const handleAmortisationDownload = useCallback(
    (frequency: AmortisationTableFrequency) => () =>
      downloadAmortisation(frequency),
    [downloadAmortisation]
  );

  useEffect(() => {
    const newSet = new Set<number>();
    if (amortisationDataYearly.length === 1) {
      newSet.add(amortisationDataYearly[0].year);
    }
    setExpandedRows(newSet);
  }, [amortisationDataYearly]);

  return (
    <Section title="Loan Amortisation Schedule">
      <TableContainer>
        <YearlyTable
          expandedRows={expandedRows}
          amortisationDataYearly={amortisationDataYearly}
          amortisationDataMonthly={amortisationDataMonthly}
          columns={columns}
          toggleRow={toggleRow}
        />
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
