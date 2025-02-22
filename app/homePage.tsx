"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <h1 className={styles.page} onClick={() => router.push("/income-tax")}>
      Income Tax Calculator
    </h1>
  );
}
