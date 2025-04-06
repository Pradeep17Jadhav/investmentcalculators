import { ChangeEvent, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import classnames from "classnames";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PrepaymentInterval } from "@/hooks/Loan/usePrepayments";
import { convertPriceToInt } from "@/helpers/price";
import { isNumber } from "@/helpers/numbers";
import { useCurrency } from "@/contexts/currency";

import styles from "./PaymentInputItem.module.css";

type Props = {
  className?: string;
  amountLabel: string;
  dateLabel: string;
  amountValue: number;
  dateValue: Dayjs;
  intervalLabel: string;
  interval: PrepaymentInterval;
  size?: "small" | "medium";
  onDateChange: (value: Dayjs) => void;
  onAmountChange: (amount: number) => void;
  onIntervalChange: (interval: PrepaymentInterval) => void;
};

const PaymentInputItem = ({
  className,
  amountLabel,
  dateLabel,
  amountValue,
  dateValue,
  intervalLabel,
  interval,
  size = "small",
  onAmountChange,
  onDateChange,
  onIntervalChange,
}: Props) => {
  const { formatAmount } = useCurrency();

  const elementValue =
    amountValue && isNumber(amountValue)
      ? formatAmount(amountValue, 0, false)
      : "";

  const handleAmountChange = useCallback(
    (e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const amount = e?.target.value ? convertPriceToInt(e.target.value) : 0;
      onAmountChange(amount);
    },
    [onAmountChange]
  );

  const handleIntervalChange = useCallback(
    (event: SelectChangeEvent<PrepaymentInterval>) => {
      onIntervalChange(event.target.value as PrepaymentInterval);
    },
    [onIntervalChange]
  );

  const handleDateChange = useCallback(
    (newValue: Dayjs | null) => {
      if (!newValue) {
        newValue = dayjs();
      }
      onDateChange(newValue);
    },
    [onDateChange]
  );

  return (
    <div className={classnames(styles.container, className)}>
      <FormControl size="small" sx={{ width: 160 }}>
        <InputLabel>{intervalLabel}</InputLabel>
        <Select
          value={interval}
          onChange={handleIntervalChange}
          label={intervalLabel}
          className={styles.intervalInput}
        >
          {Object.values(PrepaymentInterval).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className={styles.amountInput}
        placeholder={amountLabel}
        variant="outlined"
        value={elementValue}
        onChange={handleAmountChange}
        margin="normal"
        size={size}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className={styles.dateInput}
          label={dateLabel}
          views={["month", "year"]}
          value={dateValue}
          slotProps={{ textField: { size: "small" } }}
          sx={{ width: 200 }}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default PaymentInputItem;
