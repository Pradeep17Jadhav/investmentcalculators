import { ReactNode, Ref } from "react";
import classnames from "classnames";
import styles from "./Section.module.css";

const Section = ({
  children,
  title,
  autoHeight = false,
  ref,
}: {
  children: ReactNode;
  title?: string;
  autoHeight?: boolean;
  ref?: Ref<HTMLDivElement>;
}) => {
  return (
    <div
      className={classnames(styles.section, {
        [styles.fullHeight]: !autoHeight,
      })}
      ref={ref}
    >
      {!!title?.length && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};
export default Section;
