import { BlogMetadata, formatDate, getRecentBlogs } from "@/helpers/blogs";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import Grid from "@mui/material/Grid/Grid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SidebarLists from "@/components/Blog/Sidebar/SidebarLists/SidebarLists";
import SidebarCards from "@/components/Blog/Sidebar/SidebarCards/SidebarCards";

import styles from "./BlogPage.module.css";

type Props = {
  metadata: BlogMetadata;
  content: string;
};

const BlogPage = async ({ metadata, content }: Props) => {
  const { content: renderableContent } = await compileMDX<{ title: string }>({
    source: content,
    options: { parseFrontmatter: false },
  });

  const recentBlogs = getRecentBlogs(metadata.slug, 3);
  const relatedBlogs = getRecentBlogs(metadata.slug, 10, true);
  const title = metadata.title;
  const date = metadata.date;
  const image = metadata.image;
  const author = metadata.author;
  const readTime = metadata.readTime;

  return (
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
            <SidebarLists title="Related Blogs" blogs={relatedBlogs} />
            <SidebarCards title="Latest Blogs" blogs={recentBlogs} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BlogPage;
