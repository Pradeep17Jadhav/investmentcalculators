import { getConfig } from "@/helpers/config";
import { CalculatorType, Config } from "@/types/ConfigTypes";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import CommonCalculator from "@/components/Common/CommonCalculator/CommonCalculator";
import SIPCalculatorSummary from "@/components/SIP/SIPCalculatorSummary";

import styles from "./SIPPage.module.css";

const SIPPage = async () => {
  const config: Config = await getConfig();
  const { SIP } = config;
  const faqs = SIP.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>SIP Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate SIP Returns & Investment Growth
      </h2>
      <CommonCalculator
        calculatorType={CalculatorType.SIP}
        Summary={SIPCalculatorSummary}
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

export default SIPPage;
