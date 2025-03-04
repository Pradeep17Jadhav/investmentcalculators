import styles from "./SummaryItem.module.css";

type Props = {
  left: string;
  right: string;
};

const SummaryItem = ({ left, right }: Props) => {
  return (
    <span className={styles.summaryItem}>
      <span>{left}</span>
      <span>{right}</span>
    </span>
  );
};

export default SummaryItem;
