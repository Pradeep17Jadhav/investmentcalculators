"use client";
import { useEffect, useRef } from "react";
import classnames from "classnames";
import styles from "./AdWidget.module.css";

type Props = {
  client: string;
  format: "fluid" | "auto";
  layout?: "in-article" | "auto";
  slot: string;
  textAlign?: "center" | "left" | "right";
  responsive?: boolean;
  mb?: boolean;
};

const AdWidget = ({
  client,
  format,
  layout,
  slot,
  textAlign,
  responsive = false,
  mb = false,
}: Props) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    }
  }, []);

  const optionalProps = {
    ...(layout ? { "data-ad-layout": layout } : {}),
    ...(responsive ? { "data-full-width-responsive": responsive } : {}),
  };

  return (
    <div className={classnames({ [styles.mb]: mb })} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...(textAlign ? { textAlign } : {}),
        }}
        data-ad-client={client}
        data-ad-format={format}
        data-ad-slot={slot}
        {...optionalProps}
      />
    </div>
  );
};

export default AdWidget;
