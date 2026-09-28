// Cloudflare Workers assets have a hard 25 MiB per-file limit
// (https://developers.cloudflare.com/workers/static-assets/). A handful of
// files in public/ exceed that and would otherwise fail `wrangler deploy`.
// This runs after `opennextjs-cloudflare build` to drop a .assetsignore
// (wrangler's supported exclude mechanism, gitignore-style, paths relative
// to the assets directory) into the generated .open-next/assets output,
// since that directory is rebuilt from scratch every time and can't carry
// a committed file directly.
//
// Excluding a file here means it 404s on the Cloudflare deployment only —
// it is untouched everywhere else (Vercel, local dev). Each entry below
// should be paired with migrating that asset to external hosting (e.g.
// Cloudflare R2/Stream, or the existing blog.lamatic.ai host) and updating
// its reference in the docs; this list should shrink over time, not grow.
const fs = require("node:fs");
const path = require("node:path");

const OVERSIZED_ASSETS = [
  "public/videos/integrations/s3.mp4", // ~75 MiB, pages/integrations/apps-data-sources/aws-s3.mdx
  "public/videos/integrations/github.mp4", // ~32 MiB, pages/integrations/apps-data-sources/github.mdx
  "images/Lamatic Brand Kit.zip", // ~40 MiB, components/brandkitDownload.tsx
];

const assetsDir = path.join(process.cwd(), ".open-next", "assets");
const target = path.join(assetsDir, ".assetsignore");

if (!fs.existsSync(assetsDir)) {
  console.error(
    `cf-assetsignore: ${assetsDir} does not exist — run this after ` +
      "`opennextjs-cloudflare build`."
  );
  process.exit(1);
}

fs.writeFileSync(target, OVERSIZED_ASSETS.join("\n") + "\n");
console.log(
  `cf-assetsignore: wrote ${target} excluding ${OVERSIZED_ASSETS.length} oversized file(s) from the Cloudflare deploy`
);
