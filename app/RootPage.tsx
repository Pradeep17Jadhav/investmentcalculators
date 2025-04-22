import FeatureItems from "@/components/LandingPage/FeatureItemsSection/FeatureItems";
import IntroductionSection from "@/components/LandingPage/IntroductionSection/IntroductionSection";

import styles from "./RootPage.module.css";

const RootPage = async () => {
  return (
    <main>
      <div className={styles.primaryShadow} />
      <IntroductionSection />
      <FeatureItems />
      <FeatureItems />
    </main>
  );
};

export default RootPage;
