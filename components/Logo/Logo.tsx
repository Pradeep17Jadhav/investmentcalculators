"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import classnames from "classnames";

import styles from "./Logo.module.css";

type Props = {
  className?: string;
  height?: number;
  width?: number;
  smallSizeForMobile?: boolean;
  type?: "normal" | "logo";
  onClick?: () => void;
};

const Logo = ({
  className,
  width = 360,
  height = 50,
  type = "normal",
  smallSizeForMobile = false,
  onClick,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const darkLogo =
    type === "normal" ? "/images/logo.webp" : "/images/logo_icon.webp";
  const lightLogo =
    type === "normal" ? "/images/logo_black.webp" : "/images/logo_icon.webp";
  const applicableWidth = isMobile && smallSizeForMobile ? width / 1.5 : width;
  const applicableHeight =
    isMobile && smallSizeForMobile ? height / 1.5 : height;
  return (
    <Image
      className={classnames(styles.logo, className)}
      src={theme.palette.mode === "dark" ? darkLogo : lightLogo}
      alt="MoneyReload logo"
      width={applicableWidth}
      height={applicableHeight}
      onClick={onClick}
    />
  );
};

export default Logo;
