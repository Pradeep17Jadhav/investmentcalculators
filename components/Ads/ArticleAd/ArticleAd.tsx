import AdWidget from "../AdWidget/AdWidget";

const ArticleAd = () => {
  const articleSlot = "6781928555";

  return (
    <AdWidget
      client="ca-pub-8297185763828699"
      textAlign="center"
      layout="in-article"
      format="fluid"
      slot={articleSlot}
    ></AdWidget>
  );
};

export default ArticleAd;
