import { getConfig } from "@/helpers/config";
import { CalculatorType, Config } from "@/types/ConfigTypes";
import CommonCalculator from "@/components/Common/CommonCalculator/CommonCalculator";
import RDCalculatorSummary from "@/components/RD/RDCalculatorSummary";
import FAQs from "@/components/Common/FAQs/FAQs";

import styles from "./RDPage.module.css";

const RDPage = async () => {
  const config: Config = await getConfig();
  const { recurringDeposit } = config;
  const faqs = recurringDeposit.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Recurring Deposit (RD) Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate Recurring Deposit Interest & Maturity Value
      </h2>
      <CommonCalculator
        calculatorType={CalculatorType.RD}
        Summary={RDCalculatorSummary}
      />
      <FAQs faqs={faqs} />
    </div>
  );
};

export default RDPage;
