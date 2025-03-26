import IncomeTaxCalculator from "@/components/IncomeTax/IncomeTaxCalculator/IncomeTaxCalculator";
import { getConfig } from "@/helpers/config";
import { Config } from "@/types/ConfigTypes";
import FAQs from "@/components/Common/FAQs/FAQs";
import IncomeTaxPageInformation from "@/components/IncomeTax/IncomeTaxPageInformation";

import styles from "./IncomeTaxPage.module.css";

const IncomeTaxPage = async () => {
  const config: Config = await getConfig();
  const { incomeTax } = config;
  const faqs = incomeTax.faqs || [];

  return (
    <div className={styles.incometaxContainer}>
      <h1 className={styles.pageTitle}>Income Tax Calculator</h1>
      <h2 className={styles.pageSubtitle}>According to Budget February 2025</h2>
      <IncomeTaxCalculator incomeTaxConfig={incomeTax} />
      <IncomeTaxPageInformation />
      <FAQs faqs={faqs} />
    </div>
  );
};

export default IncomeTaxPage;
