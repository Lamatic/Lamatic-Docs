#!/usr/bin/env node
/**
 * Generates public/sitemap-pages.xml for routes under:
 *   /templates, /company, /agentkits, /integrations
 * (kept separate from docs sitemap - see next-sitemap.config.js exclude)
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://lamatic.ai";
const PAGES_DIR = path.join(__dirname, "..", "pages");
const OUT_FILE = path.join(__dirname, "..", "public", "sitemap-pages.xml");

const SECTIONS = ["templates", "company", "agentkits", "integrations"];
const EXTENSIONS = new Set([".mdx", ".md", ".tsx", ".ts", ".jsx", ".js"]);

function fileToRoute(filePath, section) {
  const relative = path.relative(path.join(PAGES_DIR, section), filePath);
  const withoutExt = relative.replace(/\.[^.]+$/, "");
  if (withoutExt === "index") return `/${section}`;
  const segments = withoutExt.split(path.sep).filter(Boolean);
  if (segments.some((s) => s.startsWith("["))) return null;
  return `/${section}/${segments.join("/")}`;
}

function collectRoutes(dir, section, base = "") {
  const routes = [];
  if (!fs.existsSync(dir)) return routes;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    const rel = base ? `${base}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      if (ent.name.startsWith("_") || ent.name.startsWith(".")) continue;
      routes.push(...collectRoutes(full, section, rel));
    } else if (ent.isFile() && EXTENSIONS.has(path.extname(ent.name))) {
      const route = fileToRoute(full, section);
      if (route) routes.push(route);
    }
  }
  return routes;
}

const allRoutes = [];
for (const section of SECTIONS) {
  const sectionDir = path.join(PAGES_DIR, section);
  allRoutes.push(...collectRoutes(sectionDir, section));
}

const uniq = [...new Set(allRoutes)].sort();
const lastmod = new Date().toISOString().split("T")[0];

const urlEntries = uniq
  .map(
    (loc) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, xml, "utf8");
console.log(`[sitemap-pages] Wrote ${uniq.length} URLs to ${OUT_FILE}`);
