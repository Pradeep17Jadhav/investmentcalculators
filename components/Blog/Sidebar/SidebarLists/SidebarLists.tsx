import classnames from "classnames";
import Link from "next/link";
import styles from "./SidebarLists.module.css";

type Blogs = {
  title: string;
  url: string;
}[];

type Props = {
  title: string;
  blogs: Blogs;
};

const SidebarLists = ({ title, blogs }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {blogs.map((post, index) => (
        <Link className={styles.link} key={index} href={post.url || "#"}>
          <div className={classnames(styles.item, styles.itemDivider)}>
            {post.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarLists;
