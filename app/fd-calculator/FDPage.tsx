import { getConfig } from "@/helpers/config";
import { Config } from "@/types/ConfigTypes";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";

import styles from "./FDPage.module.css";

const FDPage = async () => {
  const config: Config = await getConfig();
  const { fixedDeposit } = config;
  const faqs = fixedDeposit.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>
        Fixed Deposit (FD) Interest Calculator
      </h1>
      <h2 className={styles.pageSubtitle}>
        FD Calculator - Calculate Fixed Deposit Interest & Maturity Value
      </h2>
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

export default FDPage;
