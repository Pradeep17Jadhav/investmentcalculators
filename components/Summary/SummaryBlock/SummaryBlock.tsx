import styles from "./SummaryBlock.module.css";

type Props = {
  title: string;
  children: React.ReactNode;
};

const SummaryBlock = ({ title, children }: Props) => {
  return (
    <>
      <h6 className={styles.summaryTitle}>{title}</h6>
      {children}
    </>
  );
};

export default SummaryBlock;
