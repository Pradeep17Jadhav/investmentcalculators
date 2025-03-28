import { ChangeEvent } from "react";
import { ToWords } from "to-words";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import TextField from "@mui/material/TextField/TextField";
import { formatPrice } from "@/helpers/price";
import SelectionButtonsSet, {
  ButtonObject,
} from "../SelectionButtonsSet/SelectionButtonsSet";
import { isNumber } from "@/helpers/numbers";

import styles from "./InputElement.module.css";

type Props = {
  value: number | string;
  label: string;
  placeholder: string;
  buttonsData: (number | ButtonObject)[];
  handleChange: (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;
  isPrice?: boolean;
  isROI?: boolean;
  isActiveShortcutButton: (selectedValue: number) => boolean;
  selectShortcutButton: (selectedValue: number) => () => void;
};

const InputElement = ({
  value,
  label,
  placeholder,
  buttonsData,
  handleChange,
  isPrice,
  isROI,
  isActiveShortcutButton,
  selectShortcutButton,
}: Props) => {
  const toWords = new ToWords();
  const elementValue = value
    ? isPrice && isNumber(value)
      ? formatPrice(value)
      : value
    : "";

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
