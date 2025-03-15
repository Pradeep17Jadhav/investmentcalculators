import FooterTable from "./FooterTable/FooterTable";
import { getFooterData } from "./helpers";
import FooterLogo from "./FooterLogo/FooterLogo";

import styles from "./Footer.module.css";

const Footer = () => {
  const footerData = getFooterData();

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <FooterLogo />
        <FooterTable footerData={footerData} />
        <hr className={styles.hr} />
        <div className={styles.madeWithLove}>Made With ❤️ In Mumbai</div>
      </div>
    </div>
  );
};

export default Footer;
