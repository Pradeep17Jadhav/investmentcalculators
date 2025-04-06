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
import { useCurrency } from "@/contexts/currency";

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
  hideSelectionButtons?: boolean;
  isActiveShortcutButton: (selectedValue: number) => boolean;
  selectShortcutButton: (selectedValue: number) => () => void;
  step: number;
  getScale?: (newValue: number) => number;
  getInverseScale?: (newValue: number) => number;
};

const SELECTION_BUTTONS_ENABLED_TOGGLE = false;

const InputElement = ({
  value,
  label,
  placeholder,
  buttonsData,
  min,
  max,
  isPrice,
  isROI,
  step,
  hideSelectionButtons = false,
  handleChange,
  isActiveShortcutButton,
  selectShortcutButton,
  getScale,
  getInverseScale,
}: Props) => {
  const { currencySymbol } = useCurrency();
  const inverseValue = getInverseScale
    ? getInverseScale(parseInt(value.toString()) || 0)
    : parseInt(value.toString()) || 0;

  const toWords = new ToWords();
  const elementValue = value
    ? isPrice && isNumber(value)
      ? formatPrice(value)
      : value
    : "";

  const onSliderChange = useCallback(
    (event: Event, value: number | number[]) => {
      const newValue = getScale
        ? getScale(value as number).toString()
        : value.toString();
      handleChange(undefined, newValue);
    },
    [getScale, handleChange]
  );

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWithLabel}>
        <strong>{label}</strong>
        <TextField
          className={styles.input}
          placeholder={placeholder}
          variant="outlined"
          value={elementValue}
          onChange={handleChange}
          margin="normal"
          size="small"
          sx={{ mt: 1 }}
          slotProps={{
            input: {
              startAdornment: isPrice ? (
                <InputAdornment position="start" sx={{ mr: "4px" }}>
                  {currencySymbol}
                </InputAdornment>
              ) : undefined,
              endAdornment: isROI ? (
                <InputAdornment position="end">%</InputAdornment>
              ) : undefined,
            },
          }}
        />
      </div>

      {!!value && isPrice && isNumber(value) && (
        <div className={styles.caption}>{toWords.convert(value)}</div>
      )}

      <Slider
        className={styles.slider}
        sx={{
          "& .MuiSlider-thumb": {
            backgroundColor: "var(--primary)",
          },
          "& .MuiSlider-track": {
            backgroundColor: "var(--primary)",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "gray",
          },
        }}
        value={inverseValue}
        size="small"
        aria-label="slider"
        onChange={onSliderChange}
        min={min}
        max={max}
        step={step}
      />

      {!hideSelectionButtons && SELECTION_BUTTONS_ENABLED_TOGGLE && (
        <SelectionButtonsSet
          buttonsData={buttonsData}
          isActive={isActiveShortcutButton}
          onClick={selectShortcutButton}
        />
      )}
    </div>
  );
};

export default InputElement;
