import classnames from "classnames";

import styles from "./SummaryItem.module.css";
import { Tooltip } from "@mui/material";

type Props = {
  left: string;
  right: string;
  profit?: boolean;
  loss?: boolean;
  tooltip?: string;
};

const SummaryItem = ({ left, right, profit, loss, tooltip }: Props) => {
  return (
    <span className={styles.summaryItem}>
      <span>{left}</span>
      <Tooltip title={tooltip}>
        <span
          className={classnames({
            [styles.profit]: profit,
            [styles.loss]: loss,
          })}
        >
          {right}
        </span>
      </Tooltip>
    </span>
  );
};

export default SummaryItem;
