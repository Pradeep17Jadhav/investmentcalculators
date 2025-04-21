"use client";

import Image from "next/image";
import { useTheme } from "@mui/material";

import styles from "./IntroductionImage.module.css";

const IntroductionImage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <div className={styles.introImageContainer}>
      <Image
        className={styles.introImage}
        src={
          isDark
            ? "/images/landingPage/Landing_Dark.webp"
            : "/images/landingPage/Landing_Light.webp"
        }
        alt="MoneyControl Landing Page"
        fill
      />
    </div>
  );
};

export default IntroductionImage;
