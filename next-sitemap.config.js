const cookbookRoutes = require("./cookbook/_routes.json");

const PAGES_SITEMAP_PREFIXES = ["/templates", "/company", "/agentkits", "/integrations"];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://lamatic.ai',
    generateRobotsTxt: true,
    changefreq: 'daily',
    additionalPaths: async (config) => [{
        loc: '/public',
        priority: 1,
        changefreq: 'daily',
        lastmod: new Date().toISOString()
    }],
    exclude: [
        // Exclude non-canonical pages from sitemap which are also part of the docs
        ...cookbookRoutes
            .filter(({ docsPath }) => !!docsPath)
            .map(({ notebook }) => `/guides/cookbook/${notebook.replace(".ipynb", "")}`),
        // Separate sitemap for these sections (see scripts/generate-pages-sitemap.js)
        ...PAGES_SITEMAP_PREFIXES.flatMap(p => [p, `${p}/*`]),
    ],
    robotsTxtOptions: {
        additionalSitemaps: ['https://lamatic.ai/sitemap-pages.xml'],
    },
};