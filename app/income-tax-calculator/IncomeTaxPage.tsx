import IncomeTaxInput from "@/components/IncomeTax/IncomeTaxInput/IncomeTaxInput";
import { getConfig } from "@/helpers/config";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Config } from "@/types/ConfigTypes";

import styles from "./IncomeTaxPage.module.css";

export const metadata = {
  title: "Income Tax Calculator - Latest Budget 2025",
  description: "Calculate your income tax as per latest budget of 2025.",
  keywords:
    "investment calculators, income tax calculator, budget 2025, new tax regime, marginal relief, tax calculator",
};

const IncomeTaxPage = async () => {
  const config: Config = await getConfig();
  const { incomeTax } = config;
  const faqs = incomeTax.faqs || [];

  return (
    <div className={styles.incometaxContainer}>
      <h1 className={styles.pageTitle}>Income Tax Calculator</h1>
      <h2 className={styles.pageSubtitle}>According to Budget February 2025</h2>
      <IncomeTaxInput incomeTaxConfig={incomeTax} />
      <div className={styles.faqs}>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography component="span">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default IncomeTaxPage;
