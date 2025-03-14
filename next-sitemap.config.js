/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.investmentcalculators.in",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,

  transform: async (config, url) => {
    let priority = 0.8;

    if (url === "/") priority = 1.0;
    else if (url.startsWith("/blog")) priority = 0.5;
    else if (
      url.startsWith("/about-us") ||
      url.startsWith("/privacy-policy") ||
      url.startsWith("/terms-and-conditions") ||
      url.startsWith("/legal-and-regulatory")
    ) {
      priority = 0.3;
    }

    return {
      loc: url,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};
