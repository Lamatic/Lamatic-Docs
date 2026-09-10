// The Cloudflare "entry-point file at .open-next/worker.js was not found"
// error shows up at DEPLOY time (wrangler reading wrangler.jsonc's `main`),
// which is the worst possible place to discover the BUILD step didn't
// actually produce it — Cloudflare reports the build step as having
// succeeded, and the real cause (wrong build command configured in the
// dashboard, build silently no-op'ing, cache restoring over fresh output,
// etc.) is left for someone to guess at from a deploy-time stack trace with
// no context.
//
// Run this immediately after `opennextjs-cloudflare build` (see build:cf in
// package.json) so a missing entry-point fails loudly at the BUILD step
// instead, with a message that says exactly what's missing and why that
// matters — nothing here can fix a misconfigured Cloudflare dashboard
// build command, but it turns a silent success + confusing later failure
// into an immediate, actionable one.
const fs = require("node:fs");
const path = require("node:path");

const workerPath = path.join(process.cwd(), ".open-next", "worker.js");

if (!fs.existsSync(workerPath)) {
  console.error(
    "\ncf-verify-build: .open-next/worker.js does not exist after " +
      "`opennextjs-cloudflare build` ran.\n\n" +
      "This means the Worker's own build step didn't actually produce an " +
      "entry-point — `wrangler deploy`/`versions upload` would otherwise " +
      'fail later with "The entry-point file at \\".open-next/worker.js\\" ' +
      'was not found." at the DEPLOY step, which gives no indication the ' +
      "build itself was the problem.\n\n" +
      "Most likely cause: the Cloudflare project's configured Build " +
      "command isn't running this script at all (e.g. it's still the " +
      "plain `next build` / `bun run build`, which only ever produces " +
      "`.next/`, never `.open-next/`). Check the Cloudflare dashboard's " +
      "Build command is exactly:\n\n" +
      "    npx opennextjs-cloudflare build\n"
  );
  process.exit(1);
}

console.log("cf-verify-build: .open-next/worker.js present, OK");
