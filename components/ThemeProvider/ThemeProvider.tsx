"use client";

import { ReactNode, useMemo } from "react";
import { ThemeProvider as TP, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
        },
        typography: {
          fontFamily: inter.style.fontFamily, // Use Inter instead of Roboto
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0",
                  borderColor: "var(--border-color)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-color-hovered)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-color-focused)",
                  color: "#fff !important",
                },
              },
            },
          },
          MuiTable: {
            styleOverrides: {
              root: {
                backgroundColor: "table-background",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                backgroundColor: "table-background",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--paper-1)",
                color: "var(--foreground)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow)",
                "&.Mui-expanded": {
                  borderColor: "var(--border-color)",
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--appbar-background)",
                color: "var(--foreground)",
                "&.Mui-expanded": {
                  borderBottom: "1px solid var(--border-color)",
                },
              },
            },
          },
          MuiAccordionDetails: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--table-background)",
                color: "var(--foreground)",
              },
            },
          },
        },
      }),
    []
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0",
                  borderColor: "var(--border-color)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-color-hovered)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-color-focused)",
                  color: "#fff !important",
                },
              },
            },
          },
          MuiTable: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--table-background)",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--table-background)",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--paper-1)",
                color: "var(--foreground)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow)",
                "&.Mui-expanded": {
                  borderColor: "var(--border-color)",
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--appbar-background)",
                color: "var(--foreground)",
                "&.Mui-expanded": {
                  borderBottom: "1px solid var(--border-color)",
                },
              },
            },
          },
          MuiAccordionDetails: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--table-background)",
                color: "var(--foreground)",
              },
            },
          },
        },
      }),
    []
  );

  return (
    <TP theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </TP>
  );
}
