import styles from "./PageInformation.module.css";

type Props = {
  children: React.ReactNode;
};

const PageInformation = async ({ children }: Props) => {
  return <div className={styles.pageInformation}>{children}</div>;
};

export default PageInformation;
