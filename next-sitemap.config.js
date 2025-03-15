/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const pagesMeta = require("./pages-meta.json");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.investmentcalculators.in",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  transform: async (config, url) => {
    let priority = 0.8;
    let lastmod = new Date().toISOString();

    if (url === "/") priority = 1.0;
    else if (url.startsWith("/blog")) {
      priority = 0.7;
      const slug = url.replace("/blog/", "");
      const blogFilePath = path.join(
        process.cwd(),
        "content/blogs",
        `${slug}.mdx`
      );
      if (fs.existsSync(blogFilePath)) {
        const fileContents = fs.readFileSync(blogFilePath, "utf-8");
        const { data } = matter(fileContents);

        if (data.date) {
          lastmod = new Date(data.date).toISOString();
        }
      }
    } else if (pagesMeta[url]) {
      lastmod = new Date(pagesMeta[url]).toISOString();
      priority = 0.3;
    }

    return {
      loc: url,
      changefreq: config.changefreq,
      priority: priority,
      lastmod,
    };
  },
};
