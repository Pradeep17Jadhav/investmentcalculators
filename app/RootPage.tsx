import Grid from "@mui/material/Grid";
import { Config } from "@/types/ConfigTypes";
import { getConfig } from "@/helpers/config";
import { getAllBlogs } from "@/helpers/blogs";
import BlogCard from "@/components/Blog/BlogCard/BlogCard";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import { PATHS } from "@/constants/path";
import CalculatorBannerItem from "@/components/CalculatorBannerItem/CalculatorBannerItem";
import FeatureItems from "@/components/LandingPage/FeatureItemsSection/FeatureItems";
import IntroductionSection from "@/components/LandingPage/IntroductionSection/IntroductionSection";

import styles from "./RootPage.module.css";

const RootPage = async () => {
  const config: Config = await getConfig();
  const { homePage } = config;
  const calculatorTiles = homePage?.calculatorTiles || [];
  const recentBlogs = getAllBlogs().slice(0, 3);

  return (
    <main>
      <div className={styles.newContent}>
        <div className={styles.primaryShadow} />
        <IntroductionSection />
        <FeatureItems />
      </div>

      <div className={styles.page}>
        <h3 className={styles.pageHeader}>Our Tools</h3>
        <div className={styles.sectionContainer}>
          <Grid container justifyContent="center" alignItems="center">
            {calculatorTiles.map((tile) => (
              <Grid
                key={tile.path}
                className={styles.CalculatorBannerItemContainer}
                display="flex"
                justifyContent="space-evenly"
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
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
        </div>
        <div className={styles.sectionContainer}>
          <h3 className={styles.pageHeader}>Recent Blogs</h3>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            {recentBlogs.map((blog) => (
              <Grid key={blog.slug} className={styles.leftColumn} item>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
          <LargeButton className={styles.viewMoreBlogsBtn} href={PATHS.BLOG}>
            View All Blogs
          </LargeButton>
        </div>
      </div>
    </main>
  );
};

export default RootPage;
