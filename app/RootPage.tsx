import Banner from "@/components/Banner/Banner";
import defaultStyles from "./page.module.css";
import styles from "./RootPage.module.css";
import Grid from "@mui/material/Grid";
import { Config } from "@/types/ConfigTypes";
import { getConfig } from "@/helpers/config";

const RootPage = async () => {
  const config: Config = await getConfig();
  const { homePage } = config;
  const calculatorTiles = homePage?.calculatorTiles || [];

  return (
    <div className={defaultStyles.page}>
      <h1 className={styles.pageHeader}>Investment Calculators</h1>
      <div className={styles.calculatorsContainer}>
        <Grid
          container
          justifyContent="center"
          alignItems={"center"}
          spacing={4}
        >
          {calculatorTiles.map((tile) => (
            <Grid
              key={tile.path}
              className={styles.leftColumn}
              item
              xs={12}
              md={6}
              lg={4}
            >
              <Banner
                imgSrc={tile.imgSrc}
                label={tile.label}
                path={tile.path}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default RootPage;
