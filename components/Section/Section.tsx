import { ReactNode, Ref, useEffect, useState } from "react";
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
  const [rotation, setRotation] = useState("0deg");

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const section = document.getElementById(title || "");

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = x - centerX;
      const deltaY = y - centerY;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotation(`${angle + 90}deg`);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [title]);

  return (
    <div
      className={classnames(styles.section, {
        [styles.fullHeight]: !autoHeight,
      })}
      id={title}
      ref={ref}
      style={{ "--rotation": rotation } as React.CSSProperties}
    >
      <div className={styles.content}>
        {!!title?.length && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </div>
  );
};
export default Section;
