import styles from "./SidebarLists.module.css";

type BlogPostsList = {
  listTitle: string;
  list: {
    title: string;
    url: string;
  }[];
};

type Props = {
  blogPosts: BlogPostsList;
};

const SidebarLists = ({ blogPosts }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>{blogPosts.listTitle}</div>
      {blogPosts.list.map((post, index) => (
        <div key={index} className={styles.item}>
          <a href={post.url || "#"}>{post.title}</a>
        </div>
      ))}
    </div>
  );
};

export default SidebarLists;
