import { getConfig } from "@/helpers/config";
import { CalculatorType, Config } from "@/types/ConfigTypes";
import CommonCalculator from "@/components/Common/CommonCalculator/CommonCalculator";
import FDCalculatorSummary from "@/components/FD/FDCalculatorSummary";
import FAQs from "@/components/Common/FAQs/FAQs";
import UnderCalculatorAd from "@/components/Ads/UnderCalculatorAd/UnderCalculatorAd";

import styles from "./FDPage.module.css";

const FDPage = async () => {
  const config: Config = await getConfig();
  const { fixedDeposit } = config;
  const faqs = fixedDeposit.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Fixed Deposit (FD) Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate Fixed Deposit Interest & Maturity Value
      </h2>
      <CommonCalculator
        calculatorType={CalculatorType.FD}
        Summary={FDCalculatorSummary}
      />
      <UnderCalculatorAd />
      <FAQs faqs={faqs} />
    </div>
  );
};

export default FDPage;
