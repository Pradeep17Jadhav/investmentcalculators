"use client";

import { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";

import styles from "./DisqusComments.module.css";

type DisqusCommentsProps = {
  url: string;
  id: string;
  title: string;
};

const DisqusComments = ({ url, id, title }: DisqusCommentsProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={styles.container}>
      <DiscussionEmbed
        shortname="investment-calculators"
        config={{
          url,
          identifier: id,
          title,
          language: "en",
        }}
      />
    </div>
  );
};

export default DisqusComments;
