"use client";

import { useRouter } from "next/navigation";
import styles from "./Banner.module.css";
import Image from "next/image";

type Props = {
  imgSrc: string;
  label: string;
  path: string;
  alt?: string;
};

const Banner = ({ imgSrc, label, path, alt }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.container} onClick={() => router.push(path)}>
      <div className={styles.imageContainer}>
        <Image className={styles.img} src={imgSrc} alt={alt || label} fill />
      </div>
      <span className={styles.shadow}></span>
      <div className={styles.labelContainer}>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
};

export default Banner;
