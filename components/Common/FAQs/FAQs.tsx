import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./FAQs.module.css";
import { FAQ } from "@/types/ConfigTypes";

type Props = {
  faqs: FAQ[];
};

const FAQs = async ({ faqs }: Props) => {
  return (
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
  );
};

export default FAQs;
