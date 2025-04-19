import PageInformation from "../Common/PageInformation/PageInformation";

import styles from "./LumpsumPageInformation.module.css";

const LumpsumPageInformation = async () => {
  return (
    <PageInformation>
      <div className={styles.section}>
        <h2>What is a Lumpsum Investment?</h2>
        <p>
          A lumpsum investment is when you invest a large amount of money at one
          time, rather than spreading it out over a period. This type of
          investment can be made in various financial instruments such as Fixed
          Deposits (FD), Mutual Funds, Stocks, Real Estate, or Bonds. Lumpsum
          investing typically provides the advantage of earning returns on the
          full amount invested from day one, unlike systematic investments where
          the amount is contributed over time.
        </p>
        <p>
          Lumpsum investments are suitable for individuals who have a
          significant amount of disposable income or windfall gains (e.g.,
          bonuses, inheritance, etc.) and wish to invest that amount in a
          specific financial instrument with the goal of growing it over time.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Key Features of Lumpsum Investment</h2>
        <ul>
          <li>Invest a large sum of money at once for higher returns</li>
          <li>
            Suitable for investors with a large amount of disposable capital
          </li>
          <li>Investment can be made in various financial instruments</li>
          <li>
            Potentially higher returns due to the full amount being invested
            from day one
          </li>
          <li>
            Offers flexibility in terms of the instrument chosen (e.g., FD,
            Mutual Funds, Stocks)
          </li>
          <li>
            Ideal for achieving long-term financial goals like retirement or
            wealth building
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How is Lumpsum Investment Different from SIP?</h2>
        <p>
          Lumpsum investment is the one-time deployment of a significant sum,
          while Systematic Investment Plan (SIP) involves regular, smaller
          investments over time (monthly or quarterly). The main differences
          between the two are:
        </p>
        <ul>
          <li>
            <strong>Lumpsum:</strong> A large sum is invested at once, with the
            possibility of higher returns if the market performs well.
          </li>
          <li>
            <strong>SIP:</strong> Regular, smaller investments spread over a
            period, helping average out the cost of investment and reducing the
            risk of market volatility.
          </li>
        </ul>
        <p>
          Lumpsum investments are often more suitable for investors who have a
          one-time surplus amount and are looking for potentially higher returns
          in a shorter time frame, while SIP is more suited for long-term
          investors who want to reduce their risk exposure by investing smaller
          amounts regularly.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How Are Lumpsum Investment Returns Calculated?</h2>
        <p>
          The returns on a lumpsum investment depend on the performance of the
          financial instrument you choose. For instance:
        </p>
        <ul>
          <li>
            <strong>FD:</strong> Returns are calculated based on the interest
            rate and tenure, and are generally fixed, with periodic compounding.
          </li>
          <li>
            <strong>Mutual Funds:</strong> Returns vary based on market
            performance and the type of mutual fund (equity, debt, hybrid,
            etc.). The value of your investment fluctuates with the market.
          </li>
          <li>
            <strong>Stocks:</strong> Returns are determined by the performance
            of the underlying stocks, with potential gains or losses due to
            market fluctuations.
          </li>
        </ul>
        <p>
          Lumpsum investments offer the advantage of full exposure to the asset
          from day one, potentially allowing for higher returns, especially in
          the case of equity-based or market-linked investments.
        </p>
      </div>

      <div className={styles.section}>
        <h2>What Are the Risks of Lumpsum Investment?</h2>
        <p>
          While lumpsum investments offer the potential for high returns, they
          come with a higher risk, particularly if invested in market-linked
          instruments like stocks and mutual funds. The key risks to consider
          are:
        </p>
        <ul>
          <li>
            <strong>Market Risk:</strong> Investments in stocks or mutual funds
            can be subject to market volatility, which may lead to short-term
            losses.
          </li>
          <li>
            <strong>Interest Rate Risk:</strong> Fixed-income instruments like
            FD can be affected by changing interest rates, which may affect the
            return on investment.
          </li>
          <li>
            <strong>Lack of Diversification:</strong> A lumpsum investment in a
            single asset can expose you to higher risk compared to a diversified
            portfolio.
          </li>
        </ul>
        <p>
          It is important to assess your risk tolerance and choose the
          appropriate financial instrument based on your financial goals and
          time horizon.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Tax Implications of Lumpsum Investment</h2>
        <p>
          The tax implications of lumpsum investment depend on the type of
          instrument you invest in:
        </p>
        <ul>
          <li>
            <strong>FD:</strong> The interest earned on Fixed Deposits is
            taxable as per your income tax slab. TDS is deducted by the bank if
            the interest exceeds ₹40,000 in a financial year (₹50,000 for senior
            citizens).
          </li>
          <li>
            <strong>Mutual Funds:</strong> If you invest in equity mutual funds
            and hold them for more than one year, the returns are subject to
            long-term capital gains (LTCG) tax of 10% above ₹1 lakh. For debt
            mutual funds, the returns are subject to short- term (STCG) or
            long-term capital gains tax (LTCG) based on the holding period.
          </li>
          <li>
            <strong>Stocks:</strong> Capital gains tax applies based on the
            holding period. If held for less than a year, the tax is considered
            short-term capital gains (STCG), while long-term capital gains
            (LTCG) are taxed at 10% after a holding period of one year.
          </li>
        </ul>
        <p>
          It is important to consider the tax impact when planning your lumpsum
          investment to maximize returns and minimize tax liabilities.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How to Use the Lumpsum Investment Calculator?</h2>
        <p>
          Our Lumpsum Investment Calculator at{" "}
          <a href={process.env.PROD_URL}>
            Investment Calculators
          </a>{" "}
          helps you calculate the maturity amount and returns on your lumpsum
          investment based on the chosen instrument, interest rate, and tenure.
          You simply need to enter the following details:
        </p>
        <ul>
          <li>Principal amount (the lumpsum invested)</li>
          <li>Interest rate (or expected return rate)</li>
          <li>Investment tenure (in years)</li>
        </ul>
        <p>
          The calculator will provide an estimate of the maturity amount, making
          it easier to plan your financial goals.
        </p>
      </div>

      <div className={styles.section}>
        <h2>How is Our Lumpsum Investment Calculator Different?</h2>
        <p>
          Unlike generic calculators, our Lumpsum Investment Calculator provides
          detailed projections based on various financial instruments. It
          offers:
        </p>
        <ul>
          <li>Real-time updates as you adjust inputs</li>
          <li>Visual charts to see how your investment grows over time</li>
          <li>Comparison with different asset classes and their returns</li>
          <li>Export options to save the results for future reference</li>
        </ul>
        <p>
          Whether you are looking to invest in FD, mutual funds, or stocks, our
          calculator helps you make informed decisions about your lumpsum
          investment.
        </p>
      </div>
    </PageInformation>
  );
};

export default LumpsumPageInformation;
