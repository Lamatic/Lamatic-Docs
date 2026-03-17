import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const PAGES_DIR = path.resolve(process.cwd(), "pages");
const SKIP_FILES = new Set(["_app", "_document", "_meta", "404", "500"]);
const SKIP_DIRS = new Set(["api"]);

function stripFrontmatter(content: string): string {
  if (content.startsWith("---")) {
    const endIdx = content.indexOf("---", 3);
    if (endIdx !== -1) {
      return content.slice(endIdx + 3).trimStart();
    }
  }
  return content;
}

function stripImports(content: string): string {
  return content
    .replace(
      /^import\s+.*?(?:from\s+['"].*?['"]|['"].*?['"])\s*;?\s*$/gm,
      ""
    )
    .trimStart();
}

function cleanContent(content: string): string {
  let cleaned = stripFrontmatter(content);
  cleaned = stripImports(cleaned);
  cleaned = cleaned.replace(/<(Callout|Frame|AvailabilityBanner)[^>]*\/>/g, "");
  cleaned = cleaned.replace(
    /<(Callout|Frame)[^>]*>([\s\S]*?)<\/\1>/g,
    (_: string, __: string, inner: string) => inner.trim()
  );
  return cleaned;
}

/**
 * Try to find a source file for the given page path segments.
 * e.g. ["docs", "get-started"] -> pages/docs/get-started.mdx or .md
 *      ["docs"]                -> pages/docs/index.mdx or pages/docs.mdx
 */
function findSourceFile(segments: string[]): string | null {
  const joined = segments.join("/");

  // Check if any segment is in skip lists
  if (segments.some((s) => SKIP_FILES.has(s) || SKIP_DIRS.has(s))) {
    return null;
  }

  // Try direct file match first: pages/<joined>.mdx / .md
  for (const ext of [".mdx", ".md"]) {
    const candidate = path.join(PAGES_DIR, joined + ext);
    if (fs.existsSync(candidate)) return candidate;
  }

  // Try index file: pages/<joined>/index.mdx / .md
  for (const ext of [".mdx", ".md"]) {
    const candidate = path.join(PAGES_DIR, joined, "index" + ext);
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const segments = req.query.path;
  if (!Array.isArray(segments) || segments.length === 0) {
    return res.status(400).end();
  }

  // Sanitize: no "..", no absolute paths
  if (segments.some((s) => s === ".." || s.startsWith("/"))) {
    return res.status(400).end();
  }

  const sourcePath = findSourceFile(segments);
  if (!sourcePath) {
    return res.status(404).json({ error: "Page not found" });
  }

  const raw = fs.readFileSync(sourcePath, "utf-8");
  const cleaned = cleanContent(raw);

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.status(200).send(cleaned);
}
