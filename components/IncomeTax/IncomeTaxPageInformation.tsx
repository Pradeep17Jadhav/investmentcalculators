import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PageInformation from "../Common/PageInformation/PageInformation";

import styles from "./IncomeTaxPageInformation.module.css";

const taxSlabs = [
  { incomeRange: "Up to ₹4,00,000", taxRate: "Nil" },
  { incomeRange: "₹4,00,001 - ₹8,00,000", taxRate: "5%" },
  { incomeRange: "₹8,00,001 - ₹12,00,000", taxRate: "10%" },
  { incomeRange: "₹12,00,001 - ₹16,00,000", taxRate: "15%" },
  { incomeRange: "₹16,00,001 - ₹20,00,000", taxRate: "20%" },
  { incomeRange: "₹20,00,001 - ₹24,00,000", taxRate: "25%" },
  { incomeRange: "Above ₹24,00,000", taxRate: "30%" },
];

const IncomeTaxPageInformation = async () => {
  return (
    <PageInformation>
      <div className={styles.section}>
        <h2>{`What is Income Tax?`}</h2>
        <p>{`Income tax is a direct tax imposed by the government on an individual's or entity's earnings. It is levied annually on income generated from various sources such as salary, business profits, rental income, and capital gains. The tax system is structured into slabs, where different income levels are taxed at varying rates. The revenue collected from income tax is used for the development of the nation, including infrastructure, healthcare, education, and social welfare programs. The tax amount payable is determined based on applicable deductions, exemptions, and taxable income after adjustments.`}</p>
      </div>

      <div className={styles.section}>
        <h2>{`Who Needs to Pay Income Tax?`}</h2>
        <p>{`Income tax is mandatory for individuals, businesses, and other entities whose earnings exceed the government-defined threshold. Salaried employees, self-employed professionals, business owners, freelancers, and investors all fall under the tax ambit. Even foreign companies earning within the country are subject to taxation. The obligation to pay income tax depends on factors like age, income bracket, and residential status. Non-compliance can lead to penalties, interest on unpaid tax, and legal consequences, making it essential for taxpayers to fulfill their tax obligations on time.`}</p>
      </div>

      <div className={styles.section}>
        <h2>{`Income Tax Slabs & Rates`}</h2>
        <p>{`Income tax slabs define the percentage of tax applicable to different income levels. These slabs are revised periodically by the government and differ based on age, type of taxpayer, and tax regime. Individuals are categorized into different groups such as:`}</p>
        <ul>
          <li>{`Individuals below 60 years: Tax rates start at 5% for lower-income brackets and go up to 30% for higher earnings.`}</li>
          <li>{`Senior citizens (60-80 years): Eligible for higher exemption limits and slightly relaxed tax rates.`}</li>
          <li>{`Super senior citizens (80+ years): Enjoy even greater exemption benefits to reduce tax burdens.`}</li>
          <li>{`Corporate tax rates: Vary based on the nature of the business, turnover, and government policies.`}</li>
        </ul>
        <p>{`Here is a list of income slabs and applicable income as per the Union Budget declared on February 2025:`}</p>
        <TableContainer sx={{ maxWidth: 400 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Income Range</strong>
                </TableCell>
                <TableCell>
                  <strong>Tax Rate</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxSlabs.map((slab, index) => (
                <TableRow key={index}>
                  <TableCell>{slab.incomeRange}</TableCell>
                  <TableCell>{slab.taxRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className={styles.section}>
        <h2>{`What are Deductions & Exemptions?`}</h2>
        <p>{`Deductions and exemptions help taxpayers reduce their taxable income, thereby lowering their tax liability. The Income Tax Act provides various sections under which individuals and businesses can claim tax benefits. Some of the most commonly used deductions include:`}</p>
        <ul>
          <li>{`Section 80C: Allows deductions up to ₹1.5 lakh on investments like PPF, EPF, NSC, ELSS, life insurance premiums, and tuition fees.`}</li>
          <li>{`Section 80D: Provides deductions for health insurance premiums paid for self and family, offering financial relief for medical expenses.`}</li>
          <li>{`Section 24(b): Permits deductions on home loan interest payments, reducing tax burdens for homeowners.`}</li>
          <li>{`HRA & Standard Deduction: Salaried employees can benefit from tax exemptions on house rent allowance and a flat deduction on salary income.`}</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>{`What is TDS (Tax Deducted at Source)?`}</h2>
        <p>{`TDS is a mechanism where tax is deducted at the source of income by the payer before making the payment to the recipient. It ensures tax collection in advance and applies to various income sources such as salaries, interest earned on fixed deposits, professional fees, rental payments, and dividends. The deducted amount is directly deposited with the government and adjusted against the final tax liability of the taxpayer. This system helps in curbing tax evasion and ensures regular inflow of revenue to the government.`}</p>
      </div>

      <div className={styles.section}>
        <h2>{`What is Advance Tax?`}</h2>
        <p>{`Advance tax refers to the prepayment of income tax in installments instead of a lump sum at the end of the financial year. It is applicable to individuals and businesses with significant non-salaried income, such as freelancers, consultants, and business owners. The tax must be paid at specified intervals based on estimated income. Failure to pay advance tax can result in penalties and interest charges. This system ensures a steady flow of revenue for the government and reduces the financial burden on taxpayers at the end of the year.`}</p>
      </div>

      <div className={styles.section}>
        <h2>{`Income Tax Return (ITR) Filing`}</h2>
        <p>{`Filing an Income Tax Return (ITR) is mandatory for individuals and businesses earning above the prescribed exemption limit. The ITR filing process involves reporting income, claiming deductions, and paying any remaining tax liability. Different ITR forms apply to different taxpayer categories, including salaried individuals, businesses, and firms. Filing returns within the due date ensures compliance and avoids penalties. Additionally, filing an ITR is essential for obtaining loans, visa applications, and financial planning, as it serves as proof of income and tax compliance.`}</p>
      </div>

      <div className={styles.section}>
        <h2>{`What is Income Tax Calculator Tool at "Investment Calculators" Website?`}</h2>
        <p>
          {`Our Income Tax Calculator, available at `}
          <a href="https://www.investmentcalculators.in">{`Investment Calculators`}</a>
          {`, helps users estimate their tax liability based on income, deductions, and applicable exemptions. It simplifies tax calculations and provides users with a clear understanding of their financial obligations, making tax planning more efficient and accurate.`}
        </p>
      </div>

      <div className={styles.section}>
        <h2>{`How to Use the Income Tax Calculator?`}</h2>
        <p>{`Using the Income Tax Calculator is simple. Users need to input their income details, specify deductions, and select the applicable tax regime (old or new). The tool instantly calculates the tax payable and provides a breakdown of total tax liability. Users can modify inputs to analyze different tax-saving strategies and optimize their tax planning effectively.`}</p>
      </div>

      <div className={styles.section}>
        <h2>{`Why Use Our Income Tax Calculator?`}</h2>
        <p>{`Our calculator stands out by offering detailed tax breakdowns, and personalized tax-saving suggestions. It provides insights into possible tax deductions and exemptions, enabling users to make informed financial decisions. The intuitive interface ensures accuracy, helping individuals and businesses efficiently plan their taxes while maximizing savings.`}</p>
      </div>
    </PageInformation>
  );
};

export default IncomeTaxPageInformation;
