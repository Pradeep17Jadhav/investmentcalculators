import { BlogMetadata, formatDate, getRecentBlogs } from "@/helpers/blogs";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import Grid from "@mui/material/Grid/Grid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SidebarLists from "@/components/SidebarLists/SidebarLists";

import styles from "./BlogPage.module.css";

const relatedPosts = {
  listTitle: "Related posts",
  list: [
    {
      title: "The Power of Compounding: How Small Investments Grow Big",
      url: "",
    },
    {
      title: "Budgeting 101: Simple Steps to Take Control of Your Finances",
      url: "",
    },
    {
      title: "Understanding Credit Scores: How to Improve Yours Quickly",
      url: "",
    },
    { title: "Stock Market Basics: A Beginner’s Guide to Investing", url: "" },
    { title: "How to Build an Emergency Fund and Why It’s Essential", url: "" },
    {
      title: "Debt-Free Living: Smart Strategies to Pay Off Loans Faster",
      url: "",
    },
    {
      title:
        "Real Estate vs. Stocks: Which is the Better Long-Term Investment?",
      url: "",
    },
    {
      title: "Gold vs. Mutual Funds: Where Should You Invest in 2025?",
      url: "",
    },
    { title: "Financial Mistakes to Avoid in Your 20s and 30s", url: "" },
    {
      title: "Best Passive Income Ideas to Grow Wealth While You Sleep",
      url: "",
    },
  ],
};

type Props = {
  metadata: BlogMetadata;
  content: string;
};

const BlogPage = async ({ metadata, content }: Props) => {
  const { content: renderableContent } = await compileMDX<{ title: string }>({
    source: content,
    options: { parseFrontmatter: false },
  });

  const recentPosts = {
    listTitle: "Recent posts",
    list: getRecentBlogs(metadata.slug),
  };

  const title = metadata.title;
  const date = metadata.date;
  const image = metadata.image;
  const author = metadata.author;
  const readTime = metadata.readTime;

  return (
    <div className={styles.blogPost}>
      <div className={styles.container}>
        <Grid container spacing={4}>
          <Grid item sm={8} xs={12}>
            <div className={styles.leftSection}>
              <div className={styles.title}>
                <h1>{title}</h1>
              </div>
              <div className={styles.blogInfo}>
                <div className={styles.blogInfoItem}>
                  <CalendarTodayIcon className={styles.icon} fontSize="small" />
                  {formatDate(date)}
                </div>
                <div className={styles.blogInfoItem}>
                  <PersonIcon className={styles.icon} fontSize="small" />
                  <div>{author}</div>
                </div>
                <div className={styles.blogInfoItem}>
                  <AccessTimeIcon className={styles.icon} fontSize="small" />
                  <div>{`${readTime} min read`}</div>
                </div>
              </div>
              <hr />

              {!!image && (
                <div className={styles.imageContainer}>
                  <Image className={styles.img} src={image} alt={title} fill />
                </div>
              )}
              <div className={styles.content}>{renderableContent}</div>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className={styles.rightSection}>
              <SidebarLists blogPosts={recentPosts} />
              <SidebarLists blogPosts={relatedPosts} />
            </div>
          </Grid>
        </Grid>
      </div>
      <hr />
    </div>
  );
};

export default BlogPage;
