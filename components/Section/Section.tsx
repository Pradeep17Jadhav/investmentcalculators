import { ReactNode } from "react";
import styles from "./Section.module.css";

const Section = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  return (
    <div className={styles.section}>
      {!!title?.length && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};
export default Section;
