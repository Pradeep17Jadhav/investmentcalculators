import PageInformation from "../Common/PageInformation/PageInformation";

import styles from "./RDPageInformation.module.css";

const RDPageInformation = async () => {
  return (
    <PageInformation>
      <div className={styles.section}>
        <h2>What is a Recurring Deposit (RD)?</h2>
        <p>
          A Recurring Deposit (RD) is a popular term deposit offered by banks
          and financial institutions in India that enables individuals to save a
          fixed amount every month for a predetermined period. It encourages
          disciplined savings and is suitable for people with regular income.
          The interest earned on RDs is compounded quarterly, and the maturity
          amount includes both the principal and the accumulated interest.
        </p>
        <p>
          RDs are preferred by risk-averse investors because they offer
          guaranteed returns, making them a safe option for achieving short- to
          medium-term financial goals like vacations, gadgets, school fees, or
          emergency funds.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Key Features of RD</h2>
        <ul>
          <li>Monthly fixed deposits with pre-defined installment amount</li>
          <li>Interest is compounded quarterly and paid at maturity</li>
          <li>Tenure ranges from 6 months to 10 years depending on the bank</li>
          <li>Offers higher interest than a regular savings account</li>
          <li>No impact of market fluctuations — guaranteed returns</li>
          <li>Ideal for systematic savings and goal-based investing</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How is RD Interest Calculated?</h2>
        <p>
          RD interest is calculated using the following compound interest
          formula:
          <br />
          <strong>
            M = R × [(1 + i)<sup>n</sup> – 1] / (1 – (1 + i)<sup>-1/3</sup>)
          </strong>
        </p>
        <p>
          Where:
          <br />
          M = Maturity amount <br />
          R = Monthly deposit amount <br />
          i = Interest rate / 400 (quarterly compounding) <br />n = Number of
          months
        </p>
        <p>
          Since each installment earns interest for a different duration,
          accurate calculation is complex without a tool. Our RD calculator
          simplifies this by giving instant results based on user input.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is RD Tenure?</h2>
        <p>
          RD tenure refers to the time duration for which monthly installments
          are made. Tenure can be as short as 6 months or as long as 10 years.
          The longer the tenure, the more interest you earn due to compounding.
        </p>
        <p>
          Choose your tenure based on the financial goal you are saving for. For
          example, use a 12-month RD for short-term goals like a holiday, and a
          5-year RD for long-term planning like home down payment or education.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Is Premature Withdrawal Allowed in RD?</h2>
        <p>
          Most banks allow premature withdrawal of RD, but there are penalties
          involved. The interest rate is revised to the applicable rate for the
          actual period the RD was held, and some banks may levy an additional
          penalty of 1% on the earned interest.
        </p>
        <p>
          Partial withdrawals are not permitted. The entire RD must be closed if
          funds are needed. Always check your bank’s premature withdrawal rules
          before booking a long-term RD.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What are the Tax Implications on RD?</h2>
        <p>
          Interest earned on RD is fully taxable as per the investor’s income
          tax slab. There is no tax exemption under Section 80C. If the interest
          in a financial year exceeds ₹40,000 (₹50,000 for senior citizens),
          banks deduct TDS (Tax Deducted at Source) at 10%.
        </p>
        <p>
          It is advisable to declare RD interest while filing ITR, even if TDS
          has been deducted, to avoid scrutiny and additional penalties.
        </p>
      </div>

      <div className={styles.section}>
        <h2>RD vs Fixed Deposit (FD): What’s the Difference?</h2>
        <p>
          Both RD and FD are fixed-income instruments, but they differ in how
          deposits are made. In an FD, a lump sum is invested at once, whereas
          in an RD, the investment is made in monthly installments.
        </p>
        <ul>
          <li>
            <strong>RD:</strong> Ideal for regular savers without lump sum
            capital
          </li>
          <li>
            <strong>FD:</strong> Suitable when you have idle cash to invest
          </li>
        </ul>
        <p>
          FD generally earns slightly more interest than RD, as the full amount
          is invested from day one.
        </p>
      </div>

      <div className={styles.section}>
        <h2>
          What is the RD Calculator Tool at Investment Calculators Website?
        </h2>
        <p>
          Our RD calculator at{" "}
          <a href={process.env.PROD_URL}>
            Investment Calculators
          </a>{" "}
          allows users to calculate expected maturity value and interest earned
          based on inputs like monthly deposit, tenure, and interest rate.
        </p>
        <p>
          It is especially helpful for comparing different deposit scenarios and
          planning your savings efficiently without doing any manual math.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How to Use the RD Calculator?</h2>
        <p>
          Enter the monthly amount you want to deposit, the annual interest rate
          offered by your bank, and your desired tenure. The tool will show the
          total interest earned and final maturity amount. You can use sliders
          to modify input values and instantly see new results.
        </p>
        <p>
          This tool saves time and helps visualize how much wealth can be built
          through systematic saving over time.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How is Our RD Calculator Different?</h2>
        <p>
          Our calculator is not just fast, but intuitive and insightful. It
          offers detailed breakdowns, real-time updates, visual charts, and
          downloadable PDF reports. It also considers quarterly compounding
          accurately, unlike generic calculators that often use simple interest
          assumptions.
        </p>
        <p>
          Whether you are a student, salaried professional, or retiree, our RD
          tool helps make better savings decisions with clarity and confidence.
        </p>
      </div>
    </PageInformation>
  );
};

export default RDPageInformation;
