"use client";

import Image from "next/image";
import classnames from "classnames";
import Link from "next/link";
import { useTheme } from "@mui/material";

import styles from "./CalculatorBannerItem.module.css";

type Props = {
  className?: string;
  img: string;
  label: string;
  path: string;
  desciption?: string;
  shape?: "square" | "rectangular";
};
const CalculatorBannerItem = ({
  className,
  img,
  label,
  path,
  desciption,
}: Props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const convertImgSrcToDark = (img: string) => {
    const parts = img.split(".");
    return `${parts[0]}-dark.${parts[1]}`;
  };

  return (
    <Link href={path} passHref>
      <div className={classnames(styles.container, className)}>
        <h5 className={styles.label}>{label}</h5>
        {!!desciption && <div>{desciption}</div>}
        <div>
          <Image
            className={styles.img}
            src={isDark ? convertImgSrcToDark(img) : img}
            alt={label}
            width="64"
            height="64"
          />
        </div>
      </div>
    </Link>
  );
};

export default CalculatorBannerItem;
