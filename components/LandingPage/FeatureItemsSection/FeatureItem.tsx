import { FC } from "react";
import { SvgIconProps } from "@mui/material";

import styles from "./FeatureItem.module.css";

type Props = {
  Icon: FC<SvgIconProps>;
  title: string;
  caption: string;
};

const FeatureItem = ({ Icon, title, caption }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} fontSize="large" color="primary" />
      </div>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.caption}>{caption}</p>
    </div>
  );
};

export default FeatureItem;
