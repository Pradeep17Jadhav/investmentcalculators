import classnames from "classnames";

import styles from "./SummaryItem.module.css";

type Props = {
  left: string;
  right: string;
  profit?: boolean;
  loss?: boolean;
};

const SummaryItem = ({ left, right, profit, loss }: Props) => {
  return (
    <span className={styles.summaryItem}>
      <span>{left}</span>
      <span
        className={classnames({
          [styles.profit]: profit,
          [styles.loss]: loss,
        })}
      >
        {right}
      </span>
    </span>
  );
};

export default SummaryItem;
