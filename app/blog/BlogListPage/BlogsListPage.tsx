import { getAllBlogs } from "@/helpers/blogs";
import BlogCard from "@/components/Blog/BlogCard/BlogCard";
import Grid from "@mui/material/Grid/Grid";
import SectionContainer from "@/components/LandingPage/SectionContainer/SectionContainer";

const BlogsListPage = () => {
  const blogs = getAllBlogs();

  return (
    <SectionContainer title="Our Blogs" transition={false}>
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
    </SectionContainer>
  );
};

export default BlogsListPage;
