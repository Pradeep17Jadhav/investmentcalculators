import PageInformation from "../Common/PageInformation/PageInformation";
import styles from "./FDPageInformation.module.css";

const FDPageInformation = async () => {
  return (
    <PageInformation>
      <div className={styles.section}>
        <h2>What is a Fixed Deposit (FD)?</h2>
        <p>
          A Fixed Deposit (FD) is a popular financial product offered by banks
          and financial institutions, where a lump sum amount is invested for a
          fixed period at an agreed interest rate. FD provides guaranteed
          returns and is one of the safest investment options for risk-averse
          individuals. The interest earned on an FD is compounded quarterly, and
          the maturity amount is paid out at the end of the term.
        </p>
        <p>
          FDs are ideal for individuals who have idle funds and want a secure
          investment option with predictable returns. They are often used for
          short- to medium-term financial goals such as emergency funds,
          education expenses, or building a safety net.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Key Features of FD</h2>
        <ul>
          <li>One-time lump sum investment with a fixed tenure</li>
          <li>Interest compounded quarterly</li>
          <li>Guaranteed returns with no market risk</li>
          <li>Tenure ranges from 7 days to 10 years</li>
          <li>Higher interest rates than savings accounts</li>
          <li>Available for both individual and joint accounts</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How is FD Interest Calculated?</h2>
        <p>
          FD interest is calculated based on the principal amount and the
          interest rate offered by the bank. The interest is compounded
          quarterly and is paid either at maturity or periodically (depending on
          the option chosen).
        </p>
        <p>
          The formula for FD interest is:
          <br />
          <strong>
            A = P × (1 + r/n)<sup>nt</sup>
          </strong>
        </p>
        <p>
          Where:
          <br />
          A = Maturity amount <br />
          P = Principal amount <br />
          r = Annual interest rate <br />
          n = Number of times the interest is compounded per year <br />t = Time
          in years
        </p>
        <p>
          FD calculators use this formula to provide the expected maturity
          amount and earned interest based on user inputs.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is FD Tenure?</h2>
        <p>
          FD tenure is the duration for which your investment is locked in. The
          tenure can range from as short as 7 days to as long as 10 years,
          depending on your investment goal. Longer tenures generally offer
          higher interest rates.
        </p>
        <p>
          Choose the tenure based on your liquidity needs. For example, use a
          1-year FD for a short-term goal or a 5-year FD for long-term planning
          like retirement.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Is Premature Withdrawal Allowed in FD?</h2>
        <p>
          Yes, premature withdrawal is allowed in FD, but it usually comes with
          penalties. The interest rate is typically revised to a lower rate
          based on the period for which the FD was held, and banks may charge a
          penalty (typically 0.5% to 1%) on the interest earned.
        </p>
        <p>
          Some banks allow partial withdrawals, while others require the entire
          FD to be closed. Always review your the policies of your bank on
          premature withdrawal before investing.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What are the Tax Implications on FD?</h2>
        <p>
          Interest earned on FD is fully taxable according to your income tax
          slab. There is no tax exemption under Section 80C. If the total
          interest earned in a financial year exceeds ₹40,000 (₹50,000 for
          senior citizens), the bank will deduct TDS (Tax Deducted at Source) at
          10%.
        </p>
        <p>
          If TDS is deducted, you can claim a refund while filing your Income
          Tax Return (ITR) if your total taxable income is below the taxable
          limit.
        </p>
      </div>

      <div className={styles.section}>
        <h2>FD vs RD: What’s the Difference?</h2>
        <p>
          Fixed Deposits (FDs) and Recurring Deposits (RDs) are both safe,
          fixed-income instruments, but they differ in how you invest the money.
        </p>
        <ul>
          <li>
            <strong>FD:</strong> One-time lump sum investment, suitable when you
            have idle funds.
          </li>
          <li>
            <strong>RD:</strong> Regular monthly deposits, ideal for individuals
            who prefer systematic savings.
          </li>
        </ul>
        <p>
          FD typically offers slightly higher returns than RD, as the principal
          is invested in full from the beginning.
        </p>
      </div>

      <div className={styles.section}>
        <h2>
          What is the FD Calculator Tool at Investment Calculators Website?
        </h2>
        <p>
          Our FD calculator at{" "}
          <a href={process.env.PROD_URL}>Investment Calculators</a> helps users
          easily calculate their FD maturity amount and interest earned based on
          the principal, interest rate, and tenure.
        </p>
        <p>
          It provides quick results without the need for manual calculations,
          helping users plan their investments effectively.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How to Use the FD Calculator?</h2>
        <p>
          To use the FD calculator, simply enter the principal amount you wish
          to invest, the annual interest rate, and your desired tenure. The tool
          will calculate the maturity amount and interest earned. You can modify
          the inputs to compare various FD options.
        </p>
        <p>
          The tool also lets you adjust the frequency of interest payment
          (monthly, quarterly, or annually) to see how that impacts your
          returns.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How is Our FD Calculator Different?</h2>
        <p>
          Our FD calculator is designed to be user-friendly and offers real-time
          updates on your maturity value and earned interest. It also provides
          visual charts to illustrate your returns over time.
        </p>
        <p>
          The calculator is tailored for both regular FD investors and those
          looking for short-term or long-term investments, making it a versatile
          tool for everyone.
        </p>
      </div>
    </PageInformation>
  );
};

export default FDPageInformation;
