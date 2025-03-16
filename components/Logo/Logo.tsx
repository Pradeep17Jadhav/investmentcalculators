"use client";
import { useTheme } from "@mui/material";
import Image from "next/image";
import classnames from "classnames";

import styles from "./Logo.module.css";

type Props = {
  className?: string;
  height?: number;
  width?: number;
  onClick?: () => void;
};

const Logo = ({ className, width = 360, height = 50, onClick }: Props) => {
  const theme = useTheme();

  return (
    <Image
      className={classnames(styles.logo, className)}
      src={
        theme.palette.mode === "dark"
          ? "/images/logo.webp"
          : "/images/logo_black.webp"
      }
      alt="investment calculators logo"
      width={width}
      height={height}
      onClick={onClick}
    />
  );
};

export default Logo;
