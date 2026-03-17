"use client";

import { usePathname } from "next/navigation";
import DocsFooter from "./DocsFooter";

const DOCS_FOOTER_PATHS = [
  "/docs",
  "/company",
  "/integrations",
  "/guides",
  "/templates",
  "/agentkits",
];

/**
 * Renders the docs footer (Legal, Partners, Brandkit, etc.) on docs, company,
 * integrations, guides, templates, and agentkits routes.
 */
export default function FooterWrapper() {
  const pathname = usePathname() ?? "";

  const showFooter = DOCS_FOOTER_PATHS.some((path) => pathname.startsWith(path));
  if (showFooter) {
    return <DocsFooter />;
  }

  return null;
}
