"use client";

import { DiscussionEmbed } from "disqus-react";

type DisqusCommentsProps = {
  url: string;
  id: string;
  title: string;
};

const DisqusComments = ({ url, id, title }: DisqusCommentsProps) => {
  return (
    <DiscussionEmbed
      shortname="investment-calculators"
      config={{
        url,
        identifier: id,
        title,
        language: "en",
      }}
    />
  );
};

export default DisqusComments;
