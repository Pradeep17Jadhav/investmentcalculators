"use client";

import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { Currency, useCurrency } from "@/contexts/currency";

const flagImageMap: Record<Currency, string> = {
  AUD: "/images/flags/aud.png",
  CAD: "/images/flags/cad.png",
  CHF: "/images/flags/chf.png",
  CNY: "/images/flags/cny.png",
  EUR: "/images/flags/eur.png",
  GBP: "/images/flags/gbp.png",
  HKD: "/images/flags/hkd.png",
  INR: "/images/flags/inr.png",
  JPY: "/images/flags/jpy.png",
  SGD: "/images/flags/sgd.png",
  USD: "/images/flags/usd.png",
};

const CurrencySelector = () => {
  const { setCurrency, currency } = useCurrency();

  const handleChange = (event: SelectChangeEvent<Currency>) => {
    const selectedCurrency = event.target.value as Currency;
    setCurrency(selectedCurrency);
  };

  return (
    <Select
      value={currency}
      onChange={handleChange}
      size="small"
      sx={{
        minWidth: 100,
        bgcolor: "var(--background)",
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
        borderRadius: "16px",
      }}
      variant="outlined"
    >
      {(Object.keys(flagImageMap) as Currency[]).map((cur) => (
        <MenuItem key={cur} value={cur}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              src={flagImageMap[cur]}
              alt={cur}
              sx={{ width: 24, height: 24 }}
            />
            <Typography variant="body2">{cur}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default CurrencySelector;
