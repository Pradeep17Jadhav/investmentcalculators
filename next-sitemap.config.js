/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const pagesMeta = require("./pages-meta.json");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.PROD_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  additionalPaths: async (config) => {
    const blogDir = path.join(process.cwd(), "content/blogs");
    const blogFiles = fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : [];

    const blogPaths = blogFiles.map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return `/blog/${slug}`;
    });

    const staticPaths = Object.keys(pagesMeta);
    const allPaths = ["/", ...staticPaths.sort(), ...blogPaths.sort()];

    const pathsWithMeta = await Promise.all(
      allPaths.map(async (url) => {
        let priority = 0.8;
        let lastmod = new Date().toISOString();

        if (url === "/") {
          priority = 1.0;
        } else if (url.startsWith("/blog")) {
          const slug = url.replace("/blog/", "");
          const blogFilePath = path.join(blogDir, `${slug}.mdx`);
          if (fs.existsSync(blogFilePath)) {
            const fileContents = fs.readFileSync(blogFilePath, "utf-8");
            const { data } = matter(fileContents);
            if (data.date) {
              lastmod = new Date(data.date).toISOString();
            }
          }
        } else if (pagesMeta[url]) {
          // use same lastmod date from pages-meta.json
          lastmod = new Date(pagesMeta[url]).toISOString();
          priority = 0.3;
        }

        return {
          loc: url,
          changefreq: config.changefreq,
          priority,
          lastmod,
        };
      })
    );

    const sortedPathsWithMeta = pathsWithMeta.sort((a, b) =>
      a.loc.localeCompare(b.loc)
    );
    return sortedPathsWithMeta;
  },
};
