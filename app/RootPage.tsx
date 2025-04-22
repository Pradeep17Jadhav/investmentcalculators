import FeatureItems from "@/components/LandingPage/FeatureItemsSection/FeatureItems";
import IntroductionSection from "@/components/LandingPage/IntroductionSection/IntroductionSection";
import OfferingSection from "@/components/LandingPage/OfferingSection/OfferingSection";

import styles from "./RootPage.module.css";
import EndTaglineSection from "@/components/LandingPage/EndTaglineSection/EndTaglineSection";

const RootPage = async () => {
  return (
    <main>
      <div className={styles.primaryShadow} />
      <IntroductionSection />
      <FeatureItems />
      <OfferingSection />
      <EndTaglineSection />
    </main>
  );
};

export default RootPage;
