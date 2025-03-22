import SidebarCard from "./SidebarCard/SidebarCard";
import { Blogs } from "@/types/BlogTypes";

import styles from "./SidebarCards.module.css";

type Props = {
  title: string;
  blogs: Blogs;
};

const SidebarCards = ({ title, blogs }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {blogs.map((blog) => (
        <SidebarCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
};

export default SidebarCards;
