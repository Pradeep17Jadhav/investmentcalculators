import Banner from "@/components/Banner/Banner";
import styles from "./RootPage.module.css";
import Grid from "@mui/material/Grid";
import { Config } from "@/types/ConfigTypes";
import { getConfig } from "@/helpers/config";
import { getAllBlogs } from "@/helpers/blogs";
import BlogCard from "@/components/Blog/BlogCard/BlogCard";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import { PATHS } from "@/constants/path";

const RootPage = async () => {
  const config: Config = await getConfig();
  const { homePage } = config;
  const calculatorTiles = homePage?.calculatorTiles || [];
  const recentBlogs = getAllBlogs().slice(0, 3);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeader}>Investment Calculators</h1>
      <div className={styles.sectionContainer}>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          {calculatorTiles.map((tile) => (
            <Grid
              key={tile.path}
              className={styles.leftColumn}
              item
              xs={12}
              sm={6}
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
      <div className={styles.sectionContainer}>
        <h1 className={styles.pageHeader}>Recent Blogs</h1>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
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
  );
};

export default RootPage;
