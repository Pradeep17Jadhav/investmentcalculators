import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/helpers/blogs";
import { Blog } from "@/types/BlogTypes";

import styles from "./SidebarCard.module.css";

type Props = {
  blog: Blog;
};

const SidebarCard = ({ blog }: Props) => {
  const { title, url, image, date, readTime } = blog;
  return (
    <Link href={url}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image className={styles.img} fill src={image} alt={title} />
        </div>
        <div className={styles.cardInfoContainer}>
          <div className={styles.title}>{title}</div>
          <div className={styles.blogInfo}>
            <div className={styles.blogInfoItem}>{formatDate(date)}</div>
            <div className={styles.blogInfoItem}>{`${readTime} min read`}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SidebarCard;
