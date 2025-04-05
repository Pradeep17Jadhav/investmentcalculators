"use client";

import { useEffect, useState } from "react";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 100);
    };
    if (!isMobile) {
      window.addEventListener("scroll", toggleVisibility);
    }
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      onClick={scrollToTop}
      size="large"
      sx={{
        position: "fixed",
        bottom: visible ? 32 : -50,
        right: 48,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        backgroundColor: "var(--background-secondary)",
        color: "var(--foreground)",
        border: "1px solid var(--background)",
        boxShadow: "var(--shadow-primary)",
        transition: "bottom 300ms ease, opacity 500ms ease",
        "&:hover": { backgroundColor: "var(--primary)", color: "white" },
      }}
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );
};

export default ScrollToTop;
