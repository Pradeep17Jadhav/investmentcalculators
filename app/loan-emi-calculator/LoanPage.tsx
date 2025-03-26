import { getConfig } from "@/helpers/config";
import { Config, LoanCalculatorType } from "@/types/ConfigTypes";
import CommonLoanCalculator from "@/components/Common/LoanCalculator/CommonLoanCalculator/CommonLoanCalculator";
import LoanCalculatorSummary from "@/components/Loan/LoanCalculatorSummary";
import LoanPageInformation from "@/components/Loan/LoanPageInformation";
import FAQs from "@/components/Common/FAQs/FAQs";

import styles from "./LoanPage.module.css";

const LoanPage = async () => {
  const config: Config = await getConfig();
  const { loanEMI } = config;
  const faqs = loanEMI.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Loan EMI Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate EMI for Home, Personal & Car Loans
      </h2>
      <CommonLoanCalculator
        loanCalculatorType={LoanCalculatorType.HOME}
        Summary={LoanCalculatorSummary}
      />
      <LoanPageInformation />
      <FAQs faqs={faqs} />
    </div>
  );
};

export default LoanPage;
