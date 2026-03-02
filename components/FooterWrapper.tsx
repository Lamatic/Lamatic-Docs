import { useRouter } from "next/router";
import DocsFooter from "./DocsFooter";

/**
 * Renders the docs footer (Legal, Partners, Brandkit, etc.) on /docs and /company routes.
 */
export default function FooterWrapper() {
  const router = useRouter();
  const pathname = router?.pathname ?? "";

  if (pathname.startsWith("/docs") || pathname.startsWith("/company")) {
    return <DocsFooter />;
  }

  return null;
}
