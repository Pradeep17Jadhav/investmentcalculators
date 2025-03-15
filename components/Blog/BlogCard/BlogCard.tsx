import Link from "next/link";
import Image from "next/image";
import { BlogMetadata, formatDate } from "@/helpers/blogs";

import styles from "./BlogCard.module.css";

type Props = {
  blog: BlogMetadata;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {!!blog.image && (
          <Link href={`blog/${blog.slug}`}>
            <Image
              className={styles.img}
              fill
              src={blog.image}
              alt={blog.title}
            />
          </Link>
        )}
      </div>
      <div className={styles.cardInfoContainer}>
        <Link href={`blog/${blog.slug}`}>
          <div className={styles.title}>{blog.title}</div>
        </Link>
        <div className={styles.description}>{blog.description}</div>
        <hr />
        <div className={styles.blogInfo}>
          <div className={styles.blogInfoItem}>{formatDate(blog.date)}</div>
          <div
            className={styles.blogInfoItem}
          >{`${blog.readTime} min read`}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
