import { ChangeEvent, useMemo } from "react";
import { Tenure } from "@/types/ConfigTypes";
import TextField from "@mui/material/TextField/TextField";
import SelectionButtonsSet from "../SelectionButtonsSet/SelectionButtonsSet";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";

import styles from "./TenureInputElement.module.css";

type Props = {
  tenure: Tenure;
  label: string;
  placeholderYears: string;
  placeholderMonths: string;
  yearsData: number[];
  monthsData: number[];
  showMonths?: boolean;
  handleYearChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newYear?: string
  ) => void;
  handleMonthChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newMonth?: string
  ) => void;
  isActiveYearButton: (years: number) => boolean;
  isActiveMonthButton: (months: number) => boolean;
  selectYears: (years: number) => () => void;
  selectMonths: (months: number) => () => void;
};

const TenureInputElement = ({
  tenure,
  label,
  placeholderYears,
  placeholderMonths,
  yearsData,
  monthsData,
  showMonths,
  handleYearChange,
  handleMonthChange,
  isActiveYearButton,
  isActiveMonthButton,
  selectYears,
  selectMonths,
}: Props) => {
  const yearsInput = useMemo(
    () => (
      <div className={styles.inputItem}>
        <TextField
          placeholder={placeholderYears}
          variant="outlined"
          type="number"
          value={tenure.years || ""}
          onChange={handleYearChange}
          fullWidth
          margin="normal"
          sx={{ mt: 1 }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">yrs</InputAdornment>,
            },
          }}
        />
        <SelectionButtonsSet
          buttonsData={yearsData}
          isActive={isActiveYearButton}
          onClick={selectYears}
        />
      </div>
    ),
    [
      handleYearChange,
      isActiveYearButton,
      placeholderYears,
      selectYears,
      tenure.years,
      yearsData,
    ]
  );

  const monthsInput = useMemo(
    () => (
      <div>
        <TextField
          className={styles.inputItem}
          placeholder={placeholderMonths}
          variant="outlined"
          type="number"
          value={tenure.months || ""}
          onChange={handleMonthChange}
          fullWidth
          margin="normal"
          sx={{ mt: 1 }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">mos</InputAdornment>,
            },
          }}
        />
        <SelectionButtonsSet
          buttonsData={monthsData}
          isActive={isActiveMonthButton}
          onClick={selectMonths}
        />
      </div>
    ),
    [
      handleMonthChange,
      isActiveMonthButton,
      monthsData,
      placeholderMonths,
      selectMonths,
      tenure.months,
    ]
  );

  return (
    <div className={styles.inputContainer}>
      <strong>{label}</strong>
      <div className={styles.tenureContainer}>
        {yearsInput}
        {showMonths && <>{monthsInput}</>}
      </div>
    </div>
  );
};

export default TenureInputElement;
