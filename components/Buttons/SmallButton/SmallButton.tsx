import React from "react";
import Link from "next/link";
import classnames from "classnames";

import styles from "./SmallButton.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  centered?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const SmallButton = ({
  children,
  className,
  href,
  onClick,
  target,
  centered,
  disabled = false,
}: Props) => {
  const linkProps = {
    onClick,
    target: target || "_self",
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
    className: styles.link,
  };

  return (
    <div className={classnames(className, { [styles.centered]: centered })}>
      {href ? (
        <Link
          href={href}
          {...linkProps}
          className={classnames({ [styles.disabled]: disabled })}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={classnames(styles.button, className, {
            [styles.disabled]: disabled,
          })}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default SmallButton;
