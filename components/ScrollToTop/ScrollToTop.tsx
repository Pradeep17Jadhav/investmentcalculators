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
      setVisible(
        document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
      );
    };
    if (!isMobile) {
      document.body.addEventListener("scroll", toggleVisibility);
    }
    return () => document.body.removeEventListener("scroll", toggleVisibility);
  }, [isMobile]);

  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      onClick={scrollToTop}
      size="large"
      sx={{
        position: "fixed",
        bottom: 32,
        right: 48,
        backgroundColor: "var(--background-secondary)",
        color: "white",
        border: "1px solid var(--background)",
        boxShadow: "var(--shadow-primary)",
        "&:hover": { borderColor: "var(--primary)" },
      }}
      style={{ display: visible ? "flex" : "none" }}
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );
};

export default ScrollToTop;
