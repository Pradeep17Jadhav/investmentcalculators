"use client";

import { ReactNode, useMemo } from "react";
import { ThemeProvider as TP, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
          fontFamily: inter.style.fontFamily,
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
                  borderColor: "var(--primary-light)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary)",
                  color: "#fff !important",
                },
              },
            },
          },
          MuiTable: {
            styleOverrides: {
              root: {
                backgroundColor: "background-secondary",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                backgroundColor: "background-secondary",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--background-secondary)",
                color: "var(--foreground)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-primary)",
                "&.Mui-expanded": {
                  borderColor: "var(--border-color)",
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--background-secondary)",
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
                backgroundColor: "var(--background-secondary)",
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
        typography: {
          fontFamily: inter.style.fontFamily,
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
                  borderColor: "var(--primary-light)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary)",
                  color: "#fff !important",
                },
              },
            },
          },
          MuiTable: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--background-secondary)",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--background-secondary)",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--background-secondary)",
                color: "var(--foreground)",
                border: "none",
                boxShadow: "var(--shadow-primary)",
                "&.Mui-expanded": {
                  borderColor: "var(--border-color)",
                },
              },
            },
          },
          MuiAccordionSummary: {
            styleOverrides: {
              root: {
                backgroundColor: "var(--background-secondary)",
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
                backgroundColor: "var(--background-secondary)",
                color: "var(--foreground)",
              },
            },
          },
        },
      }),
    []
  );

  return <TP theme={prefersDarkMode ? darkTheme : lightTheme}>{children}</TP>;
}
