import styles from "./IncomeTaxPage.module.css";
import IncomeTaxInput from "@/components/IncomeTax/IncomeTaxInput/IncomeTaxInput";
import { getConfig } from "@/helpers/config";

const IncomeTaxPage = async () => {
  const config = await getConfig();
  return (
    <div className={styles.incometaxContainer}>
      <h1 className={styles.pageTitle}>Income Tax Calculator</h1>
      <h2 className={styles.pageSubtitle}>According to Budget February 2025</h2>
      <IncomeTaxInput config={config} />
    </div>
  );
};

export default IncomeTaxPage;
