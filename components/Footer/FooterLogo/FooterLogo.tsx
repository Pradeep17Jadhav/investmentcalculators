"use client";
import { useTheme } from "@mui/material";
import Image from "next/image";

import styles from "./FooterLogo.module.css";

const FooterLogo = () => {
  const theme = useTheme();

  return (
    <Image
      className={styles.logo}
      src={
        theme.palette.mode === "dark"
          ? "/images/logo.webp"
          : "/images/logo_black.webp"
      }
      alt="investment calculators logo"
      width="360"
      height="50"
    />
  );
};

export default FooterLogo;
