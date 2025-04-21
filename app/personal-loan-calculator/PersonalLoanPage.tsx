import { LoanCalculatorType } from "@/types/ConfigTypes";
import CommonLoanCalculator from "@/components/Common/LoanCalculator/CommonLoanCalculator/CommonLoanCalculator";
import LoanCalculatorSummary from "@/components/Loan/LoanCalculatorSummary";
import { PrepaymentsProvider } from "@/contexts/loan/prepaymentsContext";
import PersonalLoanPageInformation from "@/components/Loan/PageInformation/PersonalLoan/PersonalLoanPageInformation";

import styles from "./PersonalLoanPage.module.css";

const PersonalLoanPage = async () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Personal Loan Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate EMI and Tenure with Prepayment Options
      </h2>
      <PrepaymentsProvider>
        <CommonLoanCalculator
          loanCalculatorType={LoanCalculatorType.PERSONAL}
          Summary={LoanCalculatorSummary}
        />
      </PrepaymentsProvider>
      <PersonalLoanPageInformation />
    </div>
  );
};

export default PersonalLoanPage;
