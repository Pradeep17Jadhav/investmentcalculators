import { Grid } from "@mui/material";
import SectionContainer from "../SectionContainer/SectionContainer";
import OfferingItem from "./OfferingItem/OfferingItem";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PaymentsIcon from "@mui/icons-material/Payments";

import styles from "./OfferingSection.module.css";
import RevealMotion from "@/components/Motions/RevealMotion";

const OfferingSection = () => {
  return (
    <SectionContainer title="What We Offer?" className={styles.container}>
      <div>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <RevealMotion delay={0.2}>
              <OfferingItem
                Icon={AddBusinessIcon}
                title="Loan"
                caption="Calculate EMIs and interest for personal and home loans."
              />
            </RevealMotion>
          </Grid>
          <Grid item>
            <RevealMotion delay={0.4}>
              <OfferingItem
                Icon={CurrencyExchangeIcon}
                title="Investment"
                caption="Plan SIPs, mutual funds, and long-term investment returns."
              />
            </RevealMotion>
          </Grid>
          <Grid item>
            <RevealMotion delay={0.6}>
              <OfferingItem
                Icon={PaymentsIcon}
                title="Savings"
                caption="Track fixed and recurring deposit growth over time."
              />
            </RevealMotion>
          </Grid>
          <Grid item>
            <RevealMotion delay={0.8}>
              <OfferingItem
                Icon={AssuredWorkloadIcon}
                title="Tax"
                caption="Estimate income tax under old and new regimes quickly."
              />
            </RevealMotion>
          </Grid>
        </Grid>
      </div>
    </SectionContainer>
  );
};

export default OfferingSection;
