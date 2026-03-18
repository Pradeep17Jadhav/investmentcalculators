import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@mui/material", "@mui/system", "@mui/icons-material"],
};

export default nextConfig;
