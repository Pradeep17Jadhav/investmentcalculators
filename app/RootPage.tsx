import FeatureItems from "@/components/LandingPage/FeatureItemsSection/FeatureItems";
import IntroductionSection from "@/components/LandingPage/IntroductionSection/IntroductionSection";
import OfferingSection from "@/components/LandingPage/OfferingSection/OfferingSection";
import EndTaglineSection from "@/components/LandingPage/EndTaglineSection/EndTaglineSection";

import styles from "./RootPage.module.css";

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
