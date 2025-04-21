const footerDataDesktop = [
  {
    title: "Savings Calculators",
    columnItems: [
      {
        columnItemLabel: "Fixed Deposit Calculator",
        href: "./fd-calculator",
      },
      {
        columnItemLabel: "Recurring Deposit Calculator",
        href: "./rd-calculator",
      },
    ],
  },
  {
    title: "Investment Calculators",
    columnItems: [
      {
        columnItemLabel: "SIP Calculator",
        href: "./sip-calculator",
      },
      {
        columnItemLabel: "Lumpsum Calculator",
        href: "./lumpsum-calculator",
      },
    ],
  },
  {
    title: "Other Calculators",
    columnItems: [
      {
        columnItemLabel: "Income Tax Calculator",
        href: "./income-tax-calculator",
      },
      {
        columnItemLabel: "Loan EMI Calculator",
        href: "./loan-emi-calculator",
      },
      {
        columnItemLabel: "Mortgage Calculator",
        href: "./mortgage-calculator",
      },
      {
        columnItemLabel: "Personal Loan Calculator",
        href: "./personal-loan-calculator",
      },
    ],
  },
  {
    title: "Company",
    columnItems: [
      {
        columnItemLabel: "About Us",
        href: "./about-us",
      },
      {
        columnItemLabel: "Privacy Policy",
        href: "./privacy-policy",
      },
      {
        columnItemLabel: "Terms & Conditions",
        href: "./terms-and-conditions",
      },
      {
        columnItemLabel: "Legal & Regulatory",
        href: "./legal-and-regulatory",
      },
    ],
  },
];

export const getFooterData = () => footerDataDesktop;
