import { Ref } from "react";
import { ToWords } from "to-words";
import { formatPrice } from "@/helpers/price";

import styles from "./AmountBanner.module.css";

type Props = {
  amount: number;
  prefix?: string;
  ref?: Ref<HTMLDivElement>;
};

const AmountBanner = ({ amount, ref, prefix }: Props) => {
  const toWords = new ToWords();
  return (
    <div className={styles.banner} ref={ref}>
      <div className={styles.amount}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <span>₹{formatPrice(amount, 0, 0)}</span>
      </div>
      {!!amount && (
        <div className={styles.caption}>
          {toWords.convert(parseFloat(amount.toFixed(2)))}
        </div>
      )}
    </div>
  );
};

export default AmountBanner;
