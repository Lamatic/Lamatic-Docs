/**
 * Build script: copies all .mdx/.md pages from pages/ to public/md-src/ as .md files.
 * This enables serving raw markdown at /<path>.md URLs for AEO (AI Engine Optimization).
 *
 * Example: pages/docs/get-started.mdx -> public/md-src/docs/get-started.md
 */

const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.resolve(__dirname, "../pages");
const OUTPUT_DIR = path.resolve(__dirname, "../public/md-src");

// Files to skip
const SKIP_FILES = new Set(["_app", "_document", "_meta", "404", "500"]);
const SKIP_DIRS = new Set(["api"]);

function walk(dir, baseDir = dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results = results.concat(walk(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (ext !== ".mdx" && ext !== ".md") continue;
      const baseName = path.basename(entry.name, ext);
      if (SKIP_FILES.has(baseName)) continue;
      results.push(fullPath);
    }
  }
  return results;
}

function stripFrontmatter(content) {
  if (content.startsWith("---")) {
    const endIdx = content.indexOf("---", 3);
    if (endIdx !== -1) {
      return content.slice(endIdx + 3).trimStart();
    }
  }
  return content;
}

function stripImports(content) {
  // Remove import statements (single and multi-line)
  return content.replace(/^import\s+.*?(?:from\s+['"].*?['"]|['"].*?['"])\s*;?\s*$/gm, "").trimStart();
}

function cleanContent(content) {
  let cleaned = stripFrontmatter(content);
  cleaned = stripImports(cleaned);
  // Remove JSX component tags that won't render in plain markdown
  // Keep content between tags where possible
  cleaned = cleaned.replace(/<(Callout|Frame|AvailabilityBanner)[^>]*\/>/g, "");
  cleaned = cleaned.replace(/<(Callout|Frame)[^>]*>([\s\S]*?)<\/\1>/g, (_, tag, inner) => {
    return inner.trim();
  });
  return cleaned;
}

function main() {
  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = walk(PAGES_DIR);
  let count = 0;

  for (const filePath of files) {
    const relativePath = path.relative(PAGES_DIR, filePath);
    const ext = path.extname(relativePath);
    const baseName = path.basename(relativePath, ext);

    // Map output path: index.mdx -> parent.md, other.mdx -> other.md
    let outputRelative;
    if (baseName === "index") {
      const dirPart = path.dirname(relativePath);
      if (dirPart === ".") {
        outputRelative = "index.md";
      } else {
        outputRelative = dirPart + ".md";
      }
    } else {
      outputRelative = path.join(
        path.dirname(relativePath),
        baseName + ".md"
      );
    }

    // Normalize path separators
    outputRelative = outputRelative.replace(/\\/g, "/");
    const outputPath = path.join(OUTPUT_DIR, outputRelative);

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Read, clean, and write
    const content = fs.readFileSync(filePath, "utf-8");
    const cleaned = cleanContent(content);
    fs.writeFileSync(outputPath, cleaned, "utf-8");
    count++;
  }

  console.log(`✅ Copied ${count} markdown files to public/md-src/`);
}

main();
