"use client";
import { useEffect } from "react";

type Props = {
  client: string;
  format: "fluid" | "auto";
  layout?: "in-article" | "auto";
  slot: string;
  textAlign?: "center" | "left" | "right";
  responsive?: boolean;
};

const AdWidget = ({
  client,
  format,
  layout,
  slot,
  textAlign,
  responsive = false,
}: Props) => {
  const optionalProps = {
    ...(layout ? { "data-ad-layout": layout } : {}),
    ...(responsive ? { "data-full-width-responsive": responsive } : {}),
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.adsbygoogle = window.adsbygoogle || [];
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    }
  }, []);

  return (
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
    ></ins>
  );
};

export default AdWidget;
