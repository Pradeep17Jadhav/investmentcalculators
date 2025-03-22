import classnames from "classnames";
import Link from "next/link";
import styles from "./SidebarLists.module.css";
import { Blogs } from "@/types/BlogTypes";

type Props = {
  title: string;
  blogs: Blogs;
};

const SidebarLists = ({ title, blogs }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {blogs.map((blog, index) => (
        <Link className={styles.link} key={index} href={blog.slug || "#"}>
          <div className={classnames(styles.item, styles.itemDivider)}>
            {blog.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarLists;
