import FooterTable from "./FooterTable/FooterTable";
import { getFooterData } from "./helpers";
import Link from "next/link";

import styles from "./Footer.module.css";

const Footer = () => {
  const footerData = getFooterData();

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <FooterTable footerData={footerData} />
        <hr className={styles.hr} />
        <div className={styles.copyright}>
          Copyright ©2025 <Link href={process.env.PROD_URL || "#"}>MoneyReload</Link>.
          All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
