import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

type PageWithMeta = Page & {
  frontMatter?: { type?: string; order?: number; title?: string; description?: string };
  route?: string;
  name?: string;
  children?: PageWithMeta[];
};

const SECTION_DESCRIPTIONS: Record<string, string> = {
  AI: "AI nodes use machine learning models to process and analyze data, allowing for tasks such as sentiment analysis, text classification, or content generation.",
  Apps: "These nodes act as bridges, enabling data exchange and action execution between Lamatic and external services.",
  Data: "Data nodes provide tools for structuring, organizing, and processing information, ensuring data is in the right format for subsequent nodes.",
  Logics:
    "Logic nodes allow for decision-making and branching, enabling dynamic, responsive flow based on specific conditions or criteria.",
};

const SECTION_ORDER = ["AI", "Apps", "Data", "Logics"];

// --- Helper to flatten all pages recursively ---
function flattenPages(pages: PageWithMeta[]): PageWithMeta[] {
  let result: PageWithMeta[] = [];
  for (const page of pages) {
    if (page.children?.length) {
      result = result.concat(flattenPages(page.children));
    } else {
      result.push(page);
    }
  }
  return result;
}

export const NodesIndex = () => {
  // Get all pages under /docs/nodes (AI, Data, Logics — exclude Apps)
  const nodesPages = getPagesUnderRoute("/docs/nodes");
  const flattenedNodes = flattenPages(nodesPages).filter(
    (page) => page.route !== "/nodes" && page.route !== "/docs/nodes"
  );

  // Apps section: fetch from integrations/apps-data-sources
  const appsDataSourcesPages = getPagesUnderRoute(
    "/integrations/apps-data-sources"
  );
  const appsPages = flattenPages(appsDataSourcesPages).filter(
    (page) =>
      page.route !== "/integrations/apps-data-sources" &&
      page.route !== "/pages/integrations/apps-data-sources" &&
      page.route?.includes("/integrations/apps-data-sources/")
  );

  // Group node pages by type (AI, Data, Logics only — no Apps from nodes)
  const groupedPages = flattenedNodes.reduce((acc, page) => {
    let type = page.frontMatter?.type || "Other";
    if (type.toLowerCase() === "logic") type = "Logics";
    if (type.toLowerCase() === "logics") type = "Logics";
    if (type.toLowerCase() === "app") type = "Apps";
    if (type.toLowerCase() === "apps") type = "Apps";
    if (type.toLowerCase() === "ai") type = "AI";
    if (type.toLowerCase() === "data") type = "Data";
    // Skip Apps here; we use integration pages for Apps
    if (type === "Apps") return acc;
    if (!acc[type]) acc[type] = [];
    acc[type].push(page);
    return acc;
  }, {} as Record<string, PageWithMeta[]>);

  // Set Apps category from integrations/apps-data-sources
  groupedPages["Apps"] = appsPages;

  // Sort within each category
  Object.keys(groupedPages).forEach((type) => {
    groupedPages[type].sort((a, b) => {
      if (type === "Apps") {
        const titleA = a.frontMatter?.title ?? a.name ?? "";
        const titleB = b.frontMatter?.title ?? b.name ?? "";
        return String(titleA).localeCompare(String(titleB));
      }
      const orderA = a.frontMatter?.order ?? Infinity;
      const orderB = b.frontMatter?.order ?? Infinity;
      return orderA - orderB;
    });
  });

  return (
    <div className="space-y-12">
      {SECTION_ORDER.map((category) => {
        const categoryPages = groupedPages[category];
        if (!categoryPages || categoryPages.length === 0) return null;
        return (
          <div key={category} className="space-y-4">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-1">
              {category}
            </h2>
            <p className="text-sm text-gray-700 dark:text-white mb-4 max-w-3xl">
              {SECTION_DESCRIPTIONS[category]}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
              {categoryPages.map((page) => {
                const title =
                  page.frontMatter?.title ||
                  page.name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                return (
                  <div
                    key={page.route}
                    className="rounded-xl bg-white dark:bg-stone-950 border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-start justify-between min-h-[120px] shadow-sm"
                  >
                    <div className="mb-2">
                      
                      <div className="font-medium text-base leading-tight mb-1 text-black dark:text-white">
                        {title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-stone-400 leading-snug line-clamp-2">
                        {page.frontMatter?.description ||
                          "No description available"}
                      </div>
                    </div>
                    {
                      /* Simple Link as view docs */
                      <a
                        href={page.route}
                        className="mt-auto text-xs font-medium text-blue-500 flex items-center gap-1"
                      >
                        View Docs <ArrowRightIcon className="w-4 h-4" />
                      </a>
                    }
                    {/* <Link
                      href={page.route}
                      className="mt-auto text-sm font-medium text-black bg-white rounded-md px-3 py-1 border border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      View Docs
                    </Link> */}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NodesIndex;
