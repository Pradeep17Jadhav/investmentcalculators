import { getConfig } from "@/helpers/config";
import { CalculatorType, Config } from "@/types/ConfigTypes";
import CommonCalculator from "@/components/Common/CommonCalculator/CommonCalculator";
import LumpsumCalculatorSummary from "@/components/Lumpsum/LumpsumCalculatorSummary";
import FAQs from "@/components/Common/FAQs/FAQs";
import UnderCalculatorAd from "@/components/Ads/UnderCalculatorAd/UnderCalculatorAd";

import styles from "./LumpsumPage.module.css";

const LumpsumPage = async () => {
  const config: Config = await getConfig();
  const { lumpsum } = config;
  const faqs = lumpsum?.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Lumpsum Investment Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate Lumpsum Investment Returns
      </h2>
      <CommonCalculator
        calculatorType={CalculatorType.Lumpsum}
        Summary={LumpsumCalculatorSummary}
      />
      <UnderCalculatorAd />
      <FAQs faqs={faqs} />
    </div>
  );
};

export default LumpsumPage;
