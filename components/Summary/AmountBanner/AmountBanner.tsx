import { formatPrice } from "@/helpers/price";
import { ToWords } from "to-words";

import styles from "./AmountBanner.module.css";
import { Ref } from "react";

type Props = {
  amount: number;
  ref?: Ref<HTMLDivElement>;
};

const AmountBanner = ({ amount, ref }: Props) => {
  const toWords = new ToWords();
  return (
    <div className={styles.banner} ref={ref}>
      <div className={styles.amount}>₹{formatPrice(amount)}</div>
      {!!amount && (
        <div className={styles.caption}>
          {toWords.convert(parseFloat(amount.toFixed(2)))}
        </div>
      )}
    </div>
  );
};

export default AmountBanner;
