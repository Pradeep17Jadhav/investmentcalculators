import SlideMotion from "@/components/Motions/SlideMotion";
import IntroductionImage from "./IntroductionImage/IntroductionImage";
import IntroductionText from "./IntroductionText/IntroductionText";

import styles from "./IntroductionSection.module.css";

const IntroductionSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.introSection}>
        <IntroductionText />
        <SlideMotion delay={1.4}>
          <IntroductionImage />
        </SlideMotion>
      </div>
    </section>
  );
};

export default IntroductionSection;
