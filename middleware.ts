import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxies anything not otherwise handled by this Next.js app to the
// separate marketing/landing site, so the whole domain feels like one
// site. This replaces a next.config.mjs catch-all rewrite that worked on
// Vercel but crashed under @opennextjs/cloudflare (see the comment left
// in next.config.mjs where that rule used to live for why).
//
// Keep this list in sync with next.config.mjs's `rewrites`: every prefix
// or exact path handled there (or by a real page under pages/) must also
// be excluded here, since middleware runs before next.config.mjs's
// rewrites and would otherwise steal those requests first.
const EXCLUDED_FIRST_SEGMENTS = new Set([
  "docs",
  "guides",
  "integrations",
  "agentkits",
  "templates",
  "company",
  "ambassadors",
  "blog", // -> blog.lamatic.ai, via next.config.mjs rewrites
  "compare", // -> blog.lamatic.ai, via next.config.mjs rewrites
  "content", // -> blog.lamatic.ai, via next.config.mjs rewrites
  "_next",
  "public",
  "assets",
  "images",
  "api",
  ".well-known",
]);

// Exact paths next.config.mjs rewrites to a local /public file.
const EXCLUDED_EXACT_PATHS = new Set([
  "/sitemap-doc.xml",
  "/sitemap-0.xml",
  "/sitemap.xml",
  "/.well-known",
  "/robots.txt",
  "/llms.txt",
  "/llms-full.txt",
  "/skill.md",
]);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (
    EXCLUDED_EXACT_PATHS.has(pathname) ||
    pathname.endsWith(".md") || // the /:path*.md -> /api/md-src/:path* rewrite
    EXCLUDED_FIRST_SEGMENTS.has(firstSegment)
  ) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(
    new URL(`https://landing.lamatic.ai${pathname}${search}`)
  );
}
