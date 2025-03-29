import { ChangeEvent, useCallback } from "react";
import { ToWords } from "to-words";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import TextField from "@mui/material/TextField/TextField";
import { formatPrice } from "@/helpers/price";
import SelectionButtonsSet, {
  ButtonObject,
} from "../SelectionButtonsSet/SelectionButtonsSet";
import { Slider } from "@mui/material";
import { isNumber } from "@/helpers/numbers";

import styles from "./InputElement.module.css";

type Props = {
  value: number | string;
  label: string;
  placeholder: string;
  min: number;
  max: number;
  buttonsData: (number | ButtonObject)[];
  handleChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;
  isPrice?: boolean;
  isROI?: boolean;
  isActiveShortcutButton: (selectedValue: number) => boolean;
  selectShortcutButton: (selectedValue: number) => () => void;
  step: number;
};

const InputElement = ({
  value,
  label,
  placeholder,
  buttonsData,
  min,
  max,
  isPrice,
  isROI,
  handleChange,
  step,
  isActiveShortcutButton,
  selectShortcutButton,
}: Props) => {
  const toWords = new ToWords();
  const elementValue = value
    ? isPrice && isNumber(value)
      ? formatPrice(value)
      : value
    : "";

  const onSliderChange = useCallback(
    (event: Event, value: number | number[]) => {
      handleChange(undefined, value.toString());
    },
    [handleChange]
  );

  return (
    <div className={styles.inputContainer}>
      <strong>{label}</strong>
      <TextField
        placeholder={placeholder}
        variant="outlined"
        value={elementValue}
        onChange={handleChange}
        fullWidth
        margin="normal"
        size="small"
        sx={{ mt: 1 }}
        {...(isROI && {
          slotProps: {
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          },
        })}
      />
      <Slider
        className={styles.slider}
        sx={{
          "& .MuiSlider-thumb": {
            backgroundColor: "#var(--highlight-color-blue)",
          },
          "& .MuiSlider-track": {
            backgroundColor: "var(--highlight-color-blue-dark)",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "gray", 
          },
        }}
        value={parseInt(value.toString()) || 0}
        size="small"
        aria-label="slider"
        onChange={onSliderChange}
        min={min}
        max={max}
        step={step}
      />

      <SelectionButtonsSet
        buttonsData={buttonsData}
        isActive={isActiveShortcutButton}
        onClick={selectShortcutButton}
      />
      {!!value && isPrice && isNumber(value) && (
        <div className={styles.caption}>{toWords.convert(value)}</div>
      )}
    </div>
  );
};

export default InputElement;
