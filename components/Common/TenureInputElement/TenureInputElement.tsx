import { ChangeEvent, useMemo } from "react";
import classnames from "classnames";
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
  hideSelectionButtons?: boolean;
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

const SELECTION_BUTTONS_ENABLED_TOGGLE = false;

const TenureInputElement = ({
  tenure,
  label,
  placeholderYears,
  placeholderMonths,
  yearsData,
  monthsData,
  showMonths,
  hideSelectionButtons,
  handleYearChange,
  handleMonthChange,
  isActiveYearButton,
  isActiveMonthButton,
  selectYears,
  selectMonths,
}: Props) => {
  const singleRowView = !showMonths;

  const yearsInput = useMemo(
    () => (
      <div className={styles.inputItem}>
        <TextField
          className={classnames({ [styles.inputYears]: singleRowView })}
          placeholder={placeholderYears}
          variant="outlined"
          type="number"
          value={tenure.years || ""}
          onChange={handleYearChange}
          fullWidth={!singleRowView}
          margin="normal"
          size="small"
          sx={{ mt: 1 }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">yrs</InputAdornment>,
            },
          }}
        />
        {!hideSelectionButtons && SELECTION_BUTTONS_ENABLED_TOGGLE && (
          <SelectionButtonsSet
            buttonsData={yearsData}
            isActive={isActiveYearButton}
            onClick={selectYears}
          />
        )}
      </div>
    ),
    [
      singleRowView,
      placeholderYears,
      tenure.years,
      handleYearChange,
      hideSelectionButtons,
      yearsData,
      isActiveYearButton,
      selectYears,
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
          size="small"
          sx={{ mt: 1 }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">mos</InputAdornment>,
            },
          }}
        />
        {!hideSelectionButtons && SELECTION_BUTTONS_ENABLED_TOGGLE && (
          <SelectionButtonsSet
            buttonsData={monthsData}
            isActive={isActiveMonthButton}
            onClick={selectMonths}
          />
        )}
      </div>
    ),
    [
      monthsData,
      hideSelectionButtons,
      placeholderMonths,
      tenure.months,
      selectMonths,
      handleMonthChange,
      isActiveMonthButton,
    ]
  );

  const tenureContainer = useMemo(
    () => (
      <div className={styles.tenureContainer}>
        {yearsInput}
        {showMonths && <>{monthsInput}</>}
      </div>
    ),
    [monthsInput, showMonths, yearsInput]
  );

  return (
    <div className={styles.inputContainer}>
      {singleRowView ? (
        <div className={styles.inputWithLabel}>
          <strong>{label}</strong>
          {tenureContainer}
        </div>
      ) : (
        <>
          <strong>{label}</strong>
          {tenureContainer}
        </>
      )}
    </div>
  );
};

export default TenureInputElement;
