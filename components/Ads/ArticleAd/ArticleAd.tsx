import { useEffect } from "react";

const ArticleAd = () => {
  const articleIdSlot = "6781928555";
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
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-8297185763828699"
      data-ad-slot={articleIdSlot}
    ></ins>
  );
};

export default ArticleAd;
