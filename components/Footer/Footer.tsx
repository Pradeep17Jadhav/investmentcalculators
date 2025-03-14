import styles from "./Footer.module.css";
import FooterTable from "./FooterTable/FooterTable";

const Footer = () => {
  const footerData = [
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
      title: "Tax Calculators",
      columnItems: [
        {
          columnItemLabel: "Income Tax Calculator",
          href: "./income-tax-calculator",
        },
      ],
    },
    {
      title: "Loan Calculators",
      columnItems: [
        {
          columnItemLabel: "Loan EMI Calculator",
          href: "./loan-emi-calculator",
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
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <FooterTable footerData={footerData} />
        <hr className={styles.hr} />
        <div className={styles.madeWithLove}>Made With ❤️ In Mumbai</div>
      </div>
    </div>
  );
};

export default Footer;
