import React from "react";

import styles from "./LargeButton.module.css";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className: string;
  href: string;
};
const LargeButton = ({ children, className, href }: Props) => {
  return (
    <div className={className}>
      <Link className={styles.button} href={href}>
        {children}
      </Link>
    </div>
  );
};

export default LargeButton;
