"use client";

import Image from "next/image";
import classnames from "classnames";

import styles from "./Logo.module.css";

type Props = {
  className?: string;
  onClick?: () => void;
};

const Logo = ({ className, onClick }: Props) => {
  return (
    <Image
      className={classnames(styles.logo, className)}
      src="/images/logo_icon.webp"
      alt="MoneyReload logo"
      width={36}
      height={36}
      onClick={onClick}
    />
  );
};

export default Logo;
