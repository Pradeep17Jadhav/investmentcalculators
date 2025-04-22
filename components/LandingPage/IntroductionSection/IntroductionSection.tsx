import IntroductionImage from "./IntroductionImage/IntroductionImage";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";

import styles from "./IntroductionSection.module.css";

const IntroductionSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.introSection}>
        <div className={styles.introTextContainer}>
          <h1 className={styles.introTextTitle}>
            All Things Money. <br />
            Always <span className={styles.highlighted}>Reloaded</span>.
          </h1>
          <p className={styles.introTextCaption}>
            MoneyReload offers powerful finance tools to help you plan,
            calculate, and grow — effortlessly.
          </p>
          <LargeButton className={styles.viewMoreBlogsBtn} href="#">
            Check our tools <strong className={styles.arrow}>→</strong>
          </LargeButton>
        </div>
        <IntroductionImage />
      </div>
    </section>
  );
};

export default IntroductionSection;
