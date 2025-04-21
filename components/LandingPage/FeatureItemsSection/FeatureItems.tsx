import { Grid } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FeatureItem from "./FeatureItem";

import styles from "./FeatureItems.module.css";

const FeatureItems = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>Smart financial tools, made simple</h3>
          <p className={styles.caption}>
            Take control of your money with easy-to-use calculators and guides
            designed to help you make informed financial decisions.
          </p>
        </div>
        <div className={styles.featureContainer}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item sm={4}>
              <FeatureItem
                Icon={RocketLaunchIcon}
                title="Built for clarity and confidence"
                caption="Whether you're planning investments or tracking expenses, every tool is crafted to give you clear answers—fast."
              />
            </Grid>
            <Grid item sm={4}>
              <FeatureItem
                Icon={SavingsIcon}
                title="Designed for real life"
                caption="Clean, intuitive interfaces that work beautifully on any device—because managing your finances should never feel complicated."
              />
            </Grid>
            <Grid item sm={4}>
              <FeatureItem
                Icon={AccountBalanceWalletIcon}
                title="Guidance you can trust"
                caption="From taxes to savings, our resources are built to help you understand your finances without the fluff or confusion."
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default FeatureItems;
