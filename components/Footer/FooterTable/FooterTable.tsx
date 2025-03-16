import Grid from "@mui/material/Grid/Grid";
import Link from "next/link";

import styles from "./FooterTable.module.css";

type Props = {
  footerData: FooterData;
};
type FooterColumnItem = {
  columnItemLabel: string;
  href: string;
};
type FooterColumn = {
  title: string;
  columnItems: FooterColumnItem[];
};

type FooterData = FooterColumn[];

const FooterTable = ({ footerData }: Props) => {
  return (
    <Grid className={styles.footerTable} container spacing={2}>
      {footerData.map((column) => (
        <Grid key={column.title} item xs={6} sm={6} md={3}>
          <div key={column.title} className={styles.footerColumn}>
            <div className={styles.columnItemTitle}>{column.title}</div>
            {column.columnItems.map((columnItem) => {
              const href = `/${columnItem.href.replace(/^\/+/, "")}`;
              console.log("r", columnItem.href);
              console.log("p", href);
              return (
                <div key={href} className={styles.columnItem}>
                  <Link href={href}>{columnItem.columnItemLabel}</Link>
                </div>
              );
            })}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default FooterTable;
