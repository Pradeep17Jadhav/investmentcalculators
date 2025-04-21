import PageInformation from "@/components/Common/PageInformation/PageInformation";

import styles from "./PersonalLoanPageInformation.module.css";

const PersonalLoanPageInformation = async () => {
  return (
    <PageInformation>
      <div className={styles.section}>
        <h2>What is a Personal Loan?</h2>
        <p>
          {`A personal loan is an unsecured loan provided by banks, NBFCs, or
          digital lenders that allows individuals to borrow money without
          pledging any collateral. It is typically sanctioned based on the
          borrower’s income, credit score, employment stability, and existing
          liabilities. Since it’s unsecured, interest rates are usually higher
          than secured loans like home or auto loans.`}
        </p>
        <p>
          Personal loans are flexible aand multipurpose. They can be used for
          medical emergencies, weddings, home renovations, travel, or even debt
          consolidation. Unlike specific-purpose loans, there are no
          restrictions on how the funds are utilized, making them a go-to option
          when one needs quick cash without much paperwork or processing delays.
        </p>
        <p>
          Loan amounts generally range from ₹50,000 to ₹25 lakhs in India, with
          tenures spanning from 1 to 7 years. The amount and interest rate
          offered depend on your profile—higher income and better credit score
          can fetch better terms.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Who Should Take a Personal Loan?</h2>
        <p>A personal loan is suitable for individuals who:</p>
        <ul>
          <li>
            Have urgent financial needs and cannot wait to accumulate savings
          </li>
          <li>Do not have collateral to pledge for a secured loan</li>
          <li>
            Have a stable income and good credit score to qualify for lower
            interest rates
          </li>
          <li>
            Want to consolidate high-interest credit card debts into a single
            lower-interest EMI
          </li>
          <li>
            Need financial assistance for time-sensitive events like weddings,
            education deposits, or travel plans
          </li>
        </ul>
        <p>
          However, it is not advisable for people with unstable income, high
          existing debt, or poor credit history. Also, avoid taking a personal
          loan for speculative investments or luxury purchases unless absolutely
          justified.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Advantages of Personal Loans</h2>
        <ul>
          <li>
            <strong>No Collateral Required:</strong> You do not need to mortgage
            assets like property, gold, or FDs.
          </li>
          <li>
            <strong>Quick Approval & Disbursal:</strong> Most lenders approve
            and disburse loans within 24-72 hours.
          </li>
          <li>
            <strong>Fixed EMIs:</strong> Easy to plan your finances due to
            predictable monthly outflow.
          </li>
          <li>
            <strong>Flexible Use:</strong> Funds can be used for any purpose
            without restrictions.
          </li>
          <li>
            <strong>Minimal Documentation:</strong> Most digital lenders require
            just income proof and ID verification.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Disadvantages of Personal Loans</h2>
        <ul>
          <li>
            <strong>High Interest Rates:</strong> Typically range from 10% to
            24% annually, which is higher than secured loans.
          </li>
          <li>
            <strong>Prepayment Penalties:</strong> Some lenders charge a fee for
            early repayment, which eats into your interest savings.
          </li>
          <li>
            <strong>Credit Score Impact:</strong> A rejected application or
            missed EMI affects your credit report negatively.
          </li>
          <li>
            <strong>Shorter Tenure:</strong> While quick to repay, this also
            means higher monthly EMIs.
          </li>
          <li>
            <strong>Over-Borrowing Risk:</strong> Easy access may lead people to
            borrow more than they can realistically repay.
          </li>
        </ul>
        <p>
          Personal loans are a convenient financial tool—but only when used
          responsibly. Always compare loan offers, read the fine print, and
          ensure your monthly EMI doesn not exceed 30-40% of your take-home
          salary.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is EMI?</h2>
        <p>
          EMI (Equated Monthly Installment) is the fixed monthly amount paid to
          the lender, consisting of both principal and interest. Initially, the
          interest portion is higher, while the principal component increases
          over time. EMIs help in structured repayment over the chosen loan
          tenure.
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
          Where P = Loan Amount, R = Monthly Interest Rate, and N = Loan Tenure
          in months.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Understanding Principal and Interest Components</h2>
        <p>
          In every EMI, a portion goes toward interest and the rest toward
          repaying the principal. Early in the tenure, the interest component is
          higher. As the principal reduces, interest decreases and more of the
          EMI goes to the principal. This structure follows an amortization
          schedule and remains consistent for fixed-rate loans.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is Personal Loan Tenure?</h2>
        <p>
          Personal loan tenure refers to the duration over which the borrower
          repays the loan through EMIs. It typically ranges from 1 to 7 years. A
          shorter tenure results in higher EMIs but lower total interest. A
          longer tenure reduces the EMI but increases total interest paid.
          Choose the tenure based on your income and repayment capacity.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is Rate of Interest (ROI) for Personal Loans?</h2>
        <p>
          The Rate of Interest (ROI) is the annual cost of borrowing, expressed
          as a percentage. For personal loans, interest rates generally range
          from 10% to 24%, depending on the lender, credit profile of the
          borrower, and loan tenure. Lower ROI results in more affordable EMIs.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is Prepayment?</h2>
        <p>
          Prepayment is the early repayment of a loan, either partially or in
          full, before the end of the loan tenure. It reduces the outstanding
          principal, thereby cutting down future interest payments. Some lenders
          charge prepayment penalties, especially on fixed-rate loans. Always
          check your loan agreement for such conditions.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is the EMI Calculator on MoneyReload?</h2>
        <p>
          The <a href={process.env.PROD_URL}>MoneyReload</a> Personal Loan EMI
          Calculator helps users estimate monthly EMIs based on the loan amount,
          interest rate, and tenure. It supports prepayment scenarios and offers
          detailed repayment breakdowns.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How to Use the Personal Loan EMI Calculator?</h2>
        <p>
          Input your loan amount, interest rate, and tenure. The calculator
          instantly displays your EMI. You can simulate prepayments and view the
          updated amortization schedule. Results can be downloaded as PDF for
          free.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Why Use Our Personal Loan EMI Calculator?</h2>
        <p>
          Unlike basic EMI calculators, our tool provides advanced features such
          as prepayment analysis, amortization charts, and multi-currency
          support—helping you plan your repayment efficiently.
        </p>
      </div>
    </PageInformation>
  );
};

export default PersonalLoanPageInformation;
