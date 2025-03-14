import Image from "next/image";
import FooterTable from "./FooterTable/FooterTable";
import { getFooterData } from "./helpers";

import styles from "./Footer.module.css";

const Footer = () => {
  const footerData = getFooterData();

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <Image
          className={styles.logo}
          src="/images/logo.webp"
          alt="Logo"
          width="360"
          height="50"
        />
        <FooterTable footerData={footerData} />
        <hr className={styles.hr} />
        <div className={styles.madeWithLove}>Made With ❤️ In Mumbai</div>
      </div>
    </div>
  );
};

export default Footer;
