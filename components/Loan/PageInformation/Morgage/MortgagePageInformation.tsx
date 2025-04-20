import PageInformation from "../../../Common/PageInformation/PageInformation";

import styles from "./MortgagePageInformation.module.css";

const MortgagePageInformation = async () => {
  return (
    <PageInformation>
      <div className={styles.section}>
        <h2>What is a Mortgage?</h2>
        <p>
          {`A mortgage is a type of loan used to purchase real estate, where the
          property itself serves as collateral. The borrower agrees to repay the
          loan over a set period, usually 15 to 30 years, with interest.
          Mortgages are typically provided by banks, credit unions, or mortgage
          lenders. The loan amount, interest rate, and repayment terms depend on
          the borrower's creditworthiness, the type of mortgage, and the value
          of the property. Failure to make payments can result in foreclosure,
          where the lender can seize the property to recover the loan balance.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>Types of Mortgages</h2>
        <p>
          {`There are various types of mortgages available, including:`}
          <ul>
            <li>
              <strong>{`Fixed-Rate Mortgage:`}</strong>{" "}
              {`The interest rate remains
              the same throughout the loan term, ensuring predictable monthly
              payments.`}
            </li>
            <li>
              <strong>{`Adjustable-Rate Mortgage (ARM):`}</strong>{" "}
              {`The interest rate
              changes periodically based on market conditions, leading to
              fluctuating payments.`}
            </li>
            <li>
              <strong>{`FHA Loans:`}</strong>{" "}
              {`Government-backed loans designed for
              low-to-moderate income borrowers who may have lower credit scores.`}
            </li>
            <li>
              <strong>{`VA Loans:`}</strong>{" "}
              {`Loans for veterans and their families,
              often requiring no down payment and offering favorable terms.`}
            </li>
            <li>
              <strong>{`Jumbo Loans:`}</strong>{" "}
              {`Loans that exceed the conforming
              loan limits set by the Federal Housing Finance Agency (FHFA).`}
            </li>
          </ul>
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is EMI?</h2>
        <p>
          {`Equitable Monthly Installments (EMIs) are regular payments made by the
          borrower to pay off the mortgage loan. In the initial stages of the
          loan, a larger portion of the EMI goes toward paying interest, with
          the principal component increasing over time. EMIs help borrowers
          manage their mortgage repayments effectively, offering a fixed amount
          to pay each month for the duration of the loan term.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>How is EMI Calculated?</h2>
        <p>
          {`EMI is calculated using the following formula:`}
          <br />
          <strong>{`EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]`}</strong>
        </p>
        <p>
          {`Where P = Loan Principal, R = Monthly Interest Rate, and N = Loan
          Tenure in months.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>Understanding Principal and Interest Components</h2>
        <p>
          {`A mortgage EMI consists of two main components: principal and
          interest. Initially, a larger portion of the EMI is applied toward
          paying interest. Over time, as the outstanding loan balance decreases,
          a greater portion of the EMI is applied to the principal. This
          amortization schedule ensures that the loan is fully repaid by the end
          of the term.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is Mortgage Tenure?</h2>
        <p>
          {`Mortgage tenure refers to the duration over which the borrower agrees
          to repay the loan, usually between 15 to 30 years. A longer tenure
          reduces monthly EMI amounts but increases the total interest paid over
          the life of the loan. Conversely, a shorter tenure increases monthly
          EMIs but reduces the total interest paid.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>What is Rate of Interest (ROI)?</h2>
        <p>
          {`The interest rate is the percentage charged by the lender for
          borrowing the mortgage amount. It can be either fixed (remains
          constant throughout the loan term) or floating (varies with market
          conditions). The interest rate, along with the loan tenure,
          significantly affects the total cost of the mortgage and monthly EMI
          amount.`}
        </p>
        <ul>
          <li>{`Fixed-Rate Mortgage: 3% - 6%`}</li>
          <li>{`Adjustable-Rate Mortgage (ARM): Starts at 2.5% - 4%`}</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>What is Prepayment?</h2>
        <p>
          {`Prepayment refers to repaying the mortgage loan either partially or
          fully before the scheduled repayment date. This helps in reducing the
          outstanding principal, thereby reducing the overall interest cost and
          possibly shortening the loan tenure. Some lenders may charge a
          prepayment penalty, especially in the case of fixed-rate mortgages.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>{`What is the Mortgage EMI Calculator Tool At "MoneyReload" Website?`}</h2>
        <p>
          {`Our Mortgage EMI calculator on `}
          <a href={process.env.PROD_URL}>MoneyReload</a>
          {` helps you estimate monthly payments based on loan amount, interest
          rate, and tenure, enabling better mortgage planning.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>How to Use the Mortgage EMI Calculator?</h2>
        <p>
          {`Enter the loan amount, interest rate, and loan tenure in the
          calculator, and the EMI amount will be calculated instantly. Users can
          adjust the values to see how changes affect the monthly repayment
          amount. The tool also allows users to assess the impact of prepayments
          on the loan schedule.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>How is Our Mortgage EMI Calculator Different?</h2>
        <p>
          {`Unlike other tools, our calculator offers additional features such as
          amortization schedules, the impact of prepayments on loan repayment,
          and graphical representations of EMI components, allowing for more
          effective financial planning.`}
        </p>
      </div>
    </PageInformation>
  );
};

export default MortgagePageInformation;
