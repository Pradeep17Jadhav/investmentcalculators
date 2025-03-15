"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import styles from "./Banner.module.css";

type Props = {
  imgSrc: string;
  label: string;
  path: string;
  alt?: string;
};

const Banner = ({ imgSrc, label, path, alt }: Props) => {
  const router = useRouter();

  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      router.push(path);
      e?.stopPropagation();
    },
    [path, router]
  );

  return (
    <div className={styles.container} onClick={clickHandler}>
      <Link href={path} passHref>
        <div className={styles.imageContainer}>
          <Image className={styles.img} src={imgSrc} alt={alt || label} fill />
        </div>
      </Link>
      <span className={styles.shadow}></span>
      <div className={styles.labelContainer}>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
};

export default Banner;
