import Link from "next/link";
import Image from "next/image";
import { BlogMetadata, formatDate } from "@/helpers/blogs";

import styles from "./SidebarCard.module.css";

type Props = {
  blog: BlogMetadata;
};

const SidebarCard = ({ blog }: Props) => {
  const { title, slug, image, date, readTime } = blog;
  return (
    <Link href={slug}>
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
