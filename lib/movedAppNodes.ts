/**
 * Mapping of legacy docs/nodes/apps/* node paths to integrations/apps-data-sources.
 * Used for redirects, search, and "moved node" reference.
 */
export const MOVED_APP_NODES: {
  legacyPath: string;
  integrationSlug: string;
  title: string;
}[] = [
  { legacyPath: "airtable-node", integrationSlug: "airtable", title: "Airtable" },
  { legacyPath: "crawler-node", integrationSlug: "firecrawl", title: "Firecrawl (Crawler)" },
  { legacyPath: "scraper-node", integrationSlug: "firecrawl", title: "Firecrawl (Scraper)" },
  { legacyPath: "google-drive-node", integrationSlug: "google-drive", title: "Google Drive" },
  { legacyPath: "google-sheets-node", integrationSlug: "google-sheets", title: "Google Sheets" },
  { legacyPath: "n8n-node", integrationSlug: "n8n", title: "n8n" },
  { legacyPath: "notion-node", integrationSlug: "notion", title: "Notion" },
  { legacyPath: "onedrive-business-node", integrationSlug: "onedrive", title: "OneDrive" },
  { legacyPath: "postgres-node", integrationSlug: "postgres", title: "PostgreSQL" },
  { legacyPath: "s3-node", integrationSlug: "aws-s3", title: "AWS S3" },
  { legacyPath: "sharepoint-business-node", integrationSlug: "sharepoint", title: "SharePoint" },
  { legacyPath: "slack-node", integrationSlug: "slack", title: "Slack" },
  { legacyPath: "twilio-node", integrationSlug: "twilio", title: "Twilio" },
  { legacyPath: "web-search-node", integrationSlug: "websearch", title: "Web Search" },
  // Redirect to apps-data-sources index (no dedicated page yet)
  { legacyPath: "smtp-node", integrationSlug: "", title: "SMTP" },
  { legacyPath: "gmail-node", integrationSlug: "", title: "Gmail" },
  { legacyPath: "cron-node", integrationSlug: "", title: "Cron" },
];

/** Legacy path (e.g. "google-drive-node") → integration slug (e.g. "google-drive") */
export const LEGACY_NODE_TO_INTEGRATION: Record<string, string> =
  Object.fromEntries(
    MOVED_APP_NODES.filter((m) => m.integrationSlug).map((m) => [
      m.legacyPath,
      m.integrationSlug,
    ])
  );

/** Integration slug → legacy node path(s) (for "formerly X Node" display) */
export const INTEGRATION_TO_LEGACY_NODES: Record<string, string[]> = (() => {
  const map: Record<string, string[]> = {};
  for (const { legacyPath, integrationSlug } of MOVED_APP_NODES) {
    if (!integrationSlug) continue;
    if (!map[integrationSlug]) map[integrationSlug] = [];
    map[integrationSlug].push(legacyPath);
  }
  return map;
})();
