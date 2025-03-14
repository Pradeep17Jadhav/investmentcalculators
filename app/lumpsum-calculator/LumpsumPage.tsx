import { getConfig } from "@/helpers/config";
import { CalculatorType, Config } from "@/types/ConfigTypes";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import CommonCalculator from "@/components/Common/CommonCalculator/CommonCalculator";
import LumpsumCalculatorSummary from "@/components/Lumpsum/LumpsumCalculatorSummary";

import styles from "./LumpsumPage.module.css";

const LumpsumPage = async () => {
  const config: Config = await getConfig();
  const { lumpsum } = config;
  const faqs = lumpsum?.faqs || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Lumpsum Investment Calculator</h1>
      <h2 className={styles.pageSubtitle}>
        Calculate Lumpsum Investment Returns & Growth
      </h2>
      <CommonCalculator
        calculatorType={CalculatorType.Lumpsum}
        Summary={LumpsumCalculatorSummary}
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

export default LumpsumPage;
