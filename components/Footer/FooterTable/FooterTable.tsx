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
    <div className={styles.footerTable}>
      {footerData.map((column) => (
        <div key={column.title} className={styles.footerColumn}>
          <div className={styles.columnItemTitle}>{column.title}</div>
          {column.columnItems.map((columnItem) => (
            <div key={columnItem.href} className={styles.columnItem}>
              <a href={columnItem.href}>{columnItem.columnItemLabel}</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FooterTable;
