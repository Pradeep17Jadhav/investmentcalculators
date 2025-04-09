import { getConfig } from "@/helpers/config";
import { Config, LoanCalculatorType } from "@/types/ConfigTypes";
import CommonLoanCalculator from "@/components/Common/LoanCalculator/CommonLoanCalculator/CommonLoanCalculator";
import LoanCalculatorSummary from "@/components/Loan/LoanCalculatorSummary";
import LoanPageInformation from "@/components/Loan/LoanPageInformation";
import FAQs from "@/components/Common/FAQs/FAQs";
import { PrepaymentsProvider } from "@/contexts/loan/prepaymentsContext";

import styles from "./LoanPage.module.css";

const LoanPage = async () => {
  const config: Config = await getConfig();
  const { loanEMI } = config;
  const faqs = loanEMI.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Loan EMI and Tenure Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate Home, Personal & Car Loans With Prepayment
      </h2>
      <PrepaymentsProvider>
        <CommonLoanCalculator
          loanCalculatorType={LoanCalculatorType.HOME}
          Summary={LoanCalculatorSummary}
        />
      </PrepaymentsProvider>
      <LoanPageInformation />
      <FAQs faqs={faqs} />
    </div>
  );
};

export default LoanPage;
