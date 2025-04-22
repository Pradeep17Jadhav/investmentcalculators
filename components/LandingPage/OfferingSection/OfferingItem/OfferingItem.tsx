import { SvgIconProps } from "@mui/material";
import styles from "./OfferingItem.module.css";
import { FC } from "react";

type Props = {
  Icon: FC<SvgIconProps>;
  title: string;
  caption?: string;
};

const OfferingItem = ({ Icon, title, caption }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} fontSize="large" color="primary" />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.caption}>{caption}</div>
      </div>
    </div>
  );
};

export default OfferingItem;
