import { getConfig } from "@/helpers/config";
import { CalculatorType, Config } from "@/types/ConfigTypes";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import CommonCalculator from "@/components/Common/CommonCalculator/CommonCalculator";
import RDCalculatorSummary from "@/components/RD/RDCalculatorSummary";

import styles from "./RDPage.module.css";

const RDPage = async () => {
  const config: Config = await getConfig();
  const { recurringDeposit } = config;
  const faqs = recurringDeposit.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Recurring Deposit (RD) Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        RD Calculator - Calculate Recurring Deposit Interest & Maturity Value
      </h2>
      <CommonCalculator
        calculatorType={CalculatorType.RD}
        Summary={RDCalculatorSummary}
      />
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

export default RDPage;
