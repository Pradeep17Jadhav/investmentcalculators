import PageInformation from "../Common/PageInformation/PageInformation";

import styles from "./LoanPageInformation.module.css";

const LoanPageInformation = async () => {
  return (
    <PageInformation>
      <div className={styles.section}>
        <h2>What is a Loan?</h2>
        <p>
          A loan is a financial arrangement in which a lender gives a borrower a
          certain sum of money with the understanding that it will be paid back
          over time, usually with interest. The length of the loan, interest
          rate, and payback plan are all predetermined. Loans are used for a
          number of things, including asset acquisitions, business requirements,
          and personal spending. They can be acquired via banks, financial
          organizations, or private lenders. The income of the borrower,
          creditworthiness, and the sort of loan they have taken out all affect
          the terms of the loan, including the interest rate and repayment
          schedule. Penalties, higher interest rates, or legal action may result
          from late loan repayment.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Types of Loans</h2>
        <p>
          A secured loan has lower interest rates but requires collateral, such
          gold or real estate. The asset may be seized by the lender in the
          event of a borrower failure. Collateral is not needed for an unsecured
          loan, but the interest rates are higher. The income of the borrower
          and credit score determine approval, and defaulting may result in
          legal action. Whereas a floating-rate loan varies according to market
          conditions, a fixed-rate loan has a fixed interest rate, guaranteeing
          steady payments. For major expenses like homes or schooling, loans can
          also be long-term, extending over several years, or short-term, repaid
          in a few months.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is EMI?</h2>
        <p>
          Equitable monthly installments, or EMIs, are set monthly payments made
          by borrowers to cover principal and interest on loans. At first, a
          greater amount is allocated to interest, and subsequently, a greater
          amount is allocated to the principal. The loan amount, interest rate,
          and tenure all affect the EMI amount. EMIs may vary for floating-rate
          loans, while they stay the same for fixed-rate loans. Effective money
          management during loan repayment is facilitated by careful EMI
          planning.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How is EMI Calculated?</h2>
        <p>
          EMI is calculated using the formula:
          <br />
          <strong>EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]</strong>
        </p>
        <p>
          Where P = Loan Principal, R = Monthly Interest Rate, and N = Loan
          Tenure in months.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Understanding Principal and Interest Components</h2>
        <p>
          Principal and interest are the two components of payments in an EMI
          (Equated Monthly Installment). Since interest is computed on the
          outstanding loan amount, a greater percentage of the EMI is applied to
          interest at the start of the loan term. A larger percentage of the EMI
          is devoted to principle payments as the principal drops over time, and
          the interest component also decreases. This repayment plan adheres to
          the amortization schedule, which ensures complete payback at the end
          of the term by progressively reducing the loan balance. With
          fixed-rate loans, the amount of principal and interest changes over
          time, but the EMI remains constant.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is Loan Tenure?</h2>
        <p>
          {`The term loan <strong>tenure</strong> describes the entire period of
          time that a borrower is required to repay the loan, usually in the
          form of EMIs. Depending on the loan type and lender restrictions, it
          may be a few months or several years. A shorter tenure makes the loan
          more cost-effective by lowering the total amount of interest paid but
          increasing the EMIs. Although a longer tenure reduces the EMI burden,
          the total interest expense goes up. The borrower's financial
          objectives and capacity for repayment will determine the best tenure.
          Loan Tenure varies for different loan types:`}
        </p>
        <ul>
          <li>Home Loan: Up to 30 years</li>
          <li>Personal Loan: 1 to 7 years</li>
          <li>Car Loan: 3 to 7 years</li>
          <li>Education Loan: 5 to 15 years</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>What is an Rate of Interest (ROI)?</h2>
        <p>
          {`The percentage that a lender charges on the loan amount as the cost of borrowing is known as the Rate of Interest, or simply "interest rate". It establishes the additional amount that a borrower must pay over the course of the loan, on top of the principle. Interest rates can be floating, changing according to market conditions, or fixed, staying the same for the duration of the loan. The loan type, tenure, credit score, and lender policies are some of the variables that affect the rate. While a higher interest rate raises the entire cost of the loan, a lower rate lessens the overall hardship of repayment.`}
        </p>
        <ul>
          <li>Home Loan: 7% - 10%</li>
          <li>Personal Loan: 10% - 24%</li>
          <li>Car Loan: 7% - 15%</li>
          <li>Education Loan: 8% - 14%</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>What is Prepayment?</h2>
        <p>
          {`The term "prepayment" describes the early, partial, or whole repayment of a debt before its planned term expires. In order to cut future interest payments and maybe shorten the loan term, borrowers undertake prepayments to reduce the outstanding principal.`}
        </p>
        <p>
          {`Partial repayments are made in one lump sum to lower the loan balance while EMIs are still due, and full repayments are made in full before the loan's term is up. While floating-rate loans sometimes have little to no fees, some lenders incur prepayment penalties, particularly on fixed-rate loans.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>{`What is EMI Calculator Tool At "MoneyReload" Website?`}</h2>
        <p>
          Our EMI calculator, at{" "}
          <a href={process.env.PROD_URL}>MoneyReload</a>, helps users
          estimate monthly installments based on loan amount, interest rate, and
          tenure.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How to Use the Loan EMI Calculator?</h2>
        <p>
          Enter the loan amount, interest rate, and tenure into the calculator,
          and it will display the EMI amount instantly. Users can adjust values
          to see how changes affect repayment. Users can also check the changes
          in loan based on their prepayments. An Amortisation Schedule can be
          viewed and downloaded in PDF format for the entire loan tenure, at
          free of cost.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How is Our Loan EMI Calculator Different?</h2>
        <p>
          Unlike other calculators, our tool offers additional insights like
          amortization breakdown, prepayment impact, and graphical
          representation of EMI components, making financial planning easier.
        </p>
      </div>
    </PageInformation>
  );
};

export default LoanPageInformation;
