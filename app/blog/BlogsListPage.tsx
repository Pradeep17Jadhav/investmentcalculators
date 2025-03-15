import { getAllBlogs } from "@/helpers/blogs";
import BlogCard from "@/components/Blog/BlogCard/BlogCard";
import Grid from "@mui/material/Grid/Grid";

import styles from "./BlogsListPage.module.css";

const BlogsListPage = () => {
  const blogs = getAllBlogs();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Our Blogs</h1>
      <div className={styles.blogCardsContainer}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {blogs.map((blog) => (
            <Grid
              key={blog.slug}
              justifyContent="center"
              alignItems="center"
              item
            >
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      </div>
      <hr />
    </div>
  );
};

export default BlogsListPage;
