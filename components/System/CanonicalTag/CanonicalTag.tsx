"use client";

import { usePathname } from "next/navigation";

const CanonicalTag = () => {
  const pathname = usePathname();
  const baseUrl = process.env.PROD_URL || "https://www.moneyreload.com";
  const canonicalUrl = `${baseUrl}${pathname === "/" ? "" : pathname}`;

  return <link rel="canonical" href={canonicalUrl} />;
};

export default CanonicalTag;
