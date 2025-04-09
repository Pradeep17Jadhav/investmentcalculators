import { getConfig } from "@/helpers/config";
import { CalculatorType, Config } from "@/types/ConfigTypes";
import CommonCalculator from "@/components/Common/CommonCalculator/CommonCalculator";
import SIPCalculatorSummary from "@/components/SIP/SIPCalculatorSummary";
import FAQs from "@/components/Common/FAQs/FAQs";
import SIPPageInformation from "@/components/SIP/SIPPageInformation";
import UnderCalculatorAd from "@/components/Ads/UnderCalculatorAd/UnderCalculatorAd";

import styles from "./SIPPage.module.css";

const SIPPage = async () => {
  const config: Config = await getConfig();
  const { SIP } = config;
  const faqs = SIP.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>SIP Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate SIP Returns With Annual Step up and Initial Investment
      </h2>
      <CommonCalculator
        calculatorType={CalculatorType.SIP}
        Summary={SIPCalculatorSummary}
      />
      <UnderCalculatorAd />
      <SIPPageInformation />
      <FAQs faqs={faqs} />
    </div>
  );
};

export default SIPPage;
