#!/usr/bin/env node
/**
 * Generates two files for LLM consumption:
 *   - public/llms.txt        — curated index of every doc page
 *   - public/llms-full.txt   — concatenated body of every doc page
 *
 * Follows the convention at https://llmstxt.org.
 *
 * Source: all .mdx files under pages/docs/ that aren't marked
 * `display: "hidden"` in a parent _meta.ts.
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://lamatic.ai";
const ROOT = path.join(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "pages", "docs");
// Served at /llms.txt — next.config.mjs adds an explicit rewrite + catch-all
// exclusion so root-level access reaches this app instead of get.lamatic.ai.
const OUTPUT_DIR = path.join(ROOT, "public");
const LLMS_URL_PATH = "/llms.txt";
const LLMS_FULL_URL_PATH = "/llms-full.txt";

/** Parse simple YAML-ish frontmatter at the top of a file. */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    v = v.replace(/^["']|["']$/g, "");
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

/** Pull keys with `display: "hidden"` out of a _meta.ts file. */
function readHiddenKeys(metaPath) {
  if (!fs.existsSync(metaPath)) return new Set();
  const src = fs.readFileSync(metaPath, "utf8");
  const hidden = new Set();
  // Match `"key": { ... display: "hidden" ... }` over the value's brace block.
  const re = /["']?([\w-]+)["']?\s*:\s*\{[^{}]*?display\s*:\s*["']hidden["']/g;
  let m;
  while ((m = re.exec(src))) hidden.add(m[1]);
  return hidden;
}

/** Recursively walk DOCS_DIR collecting .mdx files, honouring `display: hidden`. */
function walk(dir, hiddenInParent = new Set()) {
  const out = [];
  const localHidden = readHiddenKeys(path.join(dir, "_meta.ts"));
  const hidden = new Set([...hiddenInParent, ...localHidden]);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    if (name.startsWith("_") || name.startsWith(".")) continue;
    if (name === "img" || name.endsWith("-img")) continue;
    const full = path.join(dir, name);
    if (entry.isDirectory()) {
      if (hidden.has(name)) continue;
      out.push(...walk(full, hidden));
    } else if (name.endsWith(".mdx")) {
      const key = name.replace(/\.mdx$/, "");
      if (hidden.has(key)) continue;
      out.push(full);
    }
  }
  return out;
}

/** Convert absolute mdx path to the public URL it serves at. */
function fileToUrl(filePath) {
  const rel = path
    .relative(path.join(ROOT, "pages"), filePath)
    .replace(/\\/g, "/")
    .replace(/\.mdx$/, "")
    .replace(/\/index$/, "");
  // Append .md so agents fetching this link receive markdown
  // (next.config.mjs rewrites /:path*.md to /api/md-src/:path*).
  return `${SITE_URL}/${rel}.md`;
}

/** Map a docs file to the top-level section it lives under. */
function sectionOf(filePath) {
  const rel = path.relative(DOCS_DIR, filePath).replace(/\\/g, "/");
  const parts = rel.split("/");
  return parts.length > 1 ? parts[0] : "_root";
}

const SECTION_LABELS = {
  _root: "Getting Started",
  agents: "Agents",
  concepts: "Concepts",
  context: "Data & Context",
  flows: "Flows",
  ide: "IDE",
  interface: "GraphQL, Webhooks & Widgets",
  jobs: "Jobs & Scheduling",
  logs: "Logs",
  "mcp-tools": "MCP & Tools",
  models: "Models",
  nodes: "Nodes",
  reports: "Reports",
  studio: "Studio",
  tests: "Testing",
};

function sectionLabel(slug) {
  return (
    SECTION_LABELS[slug] ||
    slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ")
  );
}

/** Strip MDX/JSX noise so the full text reads as plain markdown. */
function cleanBody(body) {
  return body
    .replace(/^import\s+[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "")
    .replace(/<NodeOverview[\s\S]*?\/>/g, "")
    .replace(/<NodeTypeInfo[\s\S]*?\/>/g, "")
    .replace(/<CopyPageMarkdown[\s\S]*?\/>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const files = walk(DOCS_DIR).sort();

const grouped = new Map();
for (const f of files) {
  const s = sectionOf(f);
  if (!grouped.has(s)) grouped.set(s, []);
  grouped.get(s).push(f);
}

const SECTION_ORDER = [
  "_root",
  "concepts",
  "studio",
  "flows",
  "nodes",
  "agents",
  "models",
  "context",
  "ide",
  "mcp-tools",
  "tests",
  "deployments",
  "jobs",
  "interface",
  "logs",
  "reports",
];
const orderedSections = [
  ...SECTION_ORDER.filter((s) => grouped.has(s)),
  ...[...grouped.keys()].filter((s) => !SECTION_ORDER.includes(s)),
];

let llms = "";
llms += "# Lamatic.ai Documentation\n\n";
llms +=
  "> Lamatic.ai is a managed platform for building, deploying, and monitoring AI-powered applications. Use this index to navigate the docs; the full text of every page is available at /llms-full.txt.\n\n";
llms += `> Full text: ${SITE_URL}${LLMS_FULL_URL_PATH}\n\n`;

for (const slug of orderedSections) {
  const list = grouped.get(slug);
  if (!list || list.length === 0) continue;
  llms += `## ${sectionLabel(slug)}\n\n`;
  for (const f of list) {
    const { data } = parseFrontmatter(fs.readFileSync(f, "utf8"));
    const title = data.title || path.basename(f, ".mdx");
    const desc = data.description || "";
    const url = fileToUrl(f);
    llms += `- [${title}](${url})${desc ? `: ${desc}` : ""}\n`;
  }
  llms += "\n";
}

let full = "";
full += "# Lamatic.ai Documentation — Full Text\n\n";
full +=
  "Concatenated source of every documentation page. Each page is preceded by its source URL.\n\n";

for (const slug of orderedSections) {
  const list = grouped.get(slug);
  if (!list || list.length === 0) continue;
  for (const f of list) {
    const raw = fs.readFileSync(f, "utf8");
    const { data, body } = parseFrontmatter(raw);
    const title = data.title || path.basename(f, ".mdx");
    const url = fileToUrl(f);
    full += `\n\n---\n\n# ${title}\n\nSource: ${url}\n\n`;
    full += cleanBody(body);
    full += "\n";
  }
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUTPUT_DIR, "llms.txt"), llms, "utf8");
fs.writeFileSync(path.join(OUTPUT_DIR, "llms-full.txt"), full, "utf8");

const fmt = (n) => (n / 1024).toFixed(1) + " KB";
console.log(
  `Generated llms.txt (${fmt(Buffer.byteLength(llms))}) and llms-full.txt (${fmt(
    Buffer.byteLength(full)
  )}) — ${files.length} pages indexed.`
);
