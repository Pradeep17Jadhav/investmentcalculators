import classnames from "classnames";
import ZoomMotion from "@/components/Motions/ZoomMotion";

import styles from "./SectionContainer.module.css";

type Props = {
  children: React.ReactNode;
  title: string;
  caption?: string;
  transition?: boolean;
  className?: string;
};

const SectionContainer = ({
  children,
  title,
  caption,
  transition = true,
  className,
}: Props) => {
  return (
    <section className={classnames(styles.section, className)}>
      <div className={styles.container}>
        {transition ? (
          <ZoomMotion duration={0.4}>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{title}</h3>
              {caption && <p className={styles.caption}>{caption}</p>}
            </div>
          </ZoomMotion>
        ) : (
          <div className={styles.textContainer}>
            <h3 className={styles.title}>{title}</h3>
            {caption && <p className={styles.caption}>{caption}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
