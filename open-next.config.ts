import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Cloudflare Workers adapter config for the Next.js app.
// No incremental cache is configured: every page is either static or
// rendered on demand, so there is nothing to persist between requests yet.
export default defineCloudflareConfig();
