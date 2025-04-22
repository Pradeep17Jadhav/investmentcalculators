import Grid from "@mui/material/Grid/Grid";
import CalculatorBannerItem from "@/components/CalculatorBannerItem/CalculatorBannerItem";
import { getConfig } from "@/helpers/config";
import { Config } from "@/types/ConfigTypes";
import SectionContainer from "@/components/LandingPage/SectionContainer/SectionContainer";

import styles from "./CalculatorsPage.module.css";

const CalculatorsPage = async () => {
  const config: Config = await getConfig();
  const { homePage } = config;
  const calculatorTiles = homePage?.calculatorTiles || [];

  return (
    <SectionContainer
      title="Our Finance Calculators"
      caption="Take control of your money with easy-to-use calculators and guides
            designed to help you make informed financial decisions."
      transition={false}
    >
      <Grid container justifyContent="center" alignItems="center">
        {calculatorTiles.map((tile) => (
          <Grid
            key={tile.path}
            display="flex"
            justifyContent="space-evenly"
            item
            xs={6}
            sm={4}
            md={3}
            lg={3}
          >
            <CalculatorBannerItem
              className={styles.calculatorBannerItem}
              img={tile.imgSrc}
              label={tile.label}
              desciption={tile.description}
              path={tile.path}
            />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default CalculatorsPage;
