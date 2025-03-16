import FooterTable from "./FooterTable/FooterTable";
import { getFooterData } from "./helpers";
import Logo from "../Logo/Logo";

import styles from "./Footer.module.css";

const Footer = () => {
  const footerData = getFooterData();

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <Logo />
        <FooterTable footerData={footerData} />
        <hr className={styles.hr} />
        <div className={styles.madeWithLove}>Made With ❤️ In Mumbai</div>
      </div>
    </div>
  );
};

export default Footer;
