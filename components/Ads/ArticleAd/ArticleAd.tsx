"use client";
import { useTheme } from "@mui/material";
import AdWidget from "../AdWidget/AdWidget";

const ArticleAd = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const articleSlot = isDark ? "4967096076" : "6781928555";

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
