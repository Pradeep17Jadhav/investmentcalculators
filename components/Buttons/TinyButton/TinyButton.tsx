import React from "react";
import classnames from "classnames";

import styles from "./TinyButton.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  active?: boolean;
  onClick?: () => void;
};
const TinyButton = ({
  children,
  className,
  onClick,
  centered,
  active,
}: Props) => {
  return (
    <div
      className={classnames(className, {
        [styles.centered]: centered,
      })}
    >
      <button
        onClick={onClick}
        className={classnames(styles.button, className, {
          [styles.active]: active,
        })}
      >
        {children}
      </button>
    </div>
  );
};

export default TinyButton;
