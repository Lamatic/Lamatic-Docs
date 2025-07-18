import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import Link from "next/link";
import { ArrowRightIcon, BotMessageSquare, Database, Zap, Settings } from "lucide-react";

const SECTION_DESCRIPTIONS: Record<string, string> = {
  "apps-data-sources": "Connect to external applications and data sources to fetch, sync, and manage data within your flows.",
  "models": "Integrate with various AI models and providers to enhance your flows with machine learning capabilities.",
  "tools": "Connect to development tools and platforms to streamline your workflow and development process.",
};

const SECTION_ORDER = ["apps-data-sources", "models", "tools"];

const SECTION_ICONS: Record<string, any> = {
  "apps-data-sources": Database,
  "models": BotMessageSquare,
  "tools": Settings,
};

// --- Helper to flatten all pages recursively ---
function flattenPages(pages) {
  let result = [];
  for (const page of pages) {
    if (page.children) {
      result = result.concat(flattenPages(page.children));
    } else {
      result.push(page);
    }
  }
  return result;
}

export const IntegrationsIndex = () => {
  // Get all pages under /integrations (including subfolders)
  const allPages = getPagesUnderRoute("/integrations");
  const pages = flattenPages(allPages).filter(
    (page) => page.route !== "/integrations" && page.route !== "/pages/integrations"
  );

  // Group by type/category
  const groupedPages = pages.reduce((acc, page) => {
    // Extract category from the route path
    const routeParts = page.route.split('/');
    let category = "other";
    
    // Check if the route contains one of our known categories
    if (routeParts.includes("apps-data-sources")) {
      category = "apps-data-sources";
    } else if (routeParts.includes("models")) {
      category = "models";
    } else if (routeParts.includes("tools")) {
      category = "tools";
    }
    
    if (!acc[category]) acc[category] = [];
    acc[category].push(page);
    return acc;
  }, {});

  // Sort within each category
  Object.keys(groupedPages).forEach((category) => {
    groupedPages[category].sort((a, b) => {
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
        
        const IconComponent = SECTION_ICONS[category];
        const categoryTitle = category === "apps-data-sources" ? "Apps & Data Sources" : 
                             category === "models" ? "Models" : 
                             category === "tools" ? "Tools" : category;
        
        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2 mb-1 ">
              {/* {IconComponent && <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />} */}
              <h3 className="text-lg font-semibold text-black dark:text-white leading-none">
                {categoryTitle}
              </h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-white mb-4 max-w-3xl">
              {SECTION_DESCRIPTIONS[category]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryPages.map((page) => {
                const title =
                  page.frontMatter?.title ||
                  page.name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                const icon = page.frontMatter?.icon || null;
                return (
                  <div
                    key={page.route}
                    className="rounded-xl bg-white dark:bg-stone-950 border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-start justify-between min-h-[140px] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-2 w-full">
                      {icon && <img src={icon} alt={title} className="w-6 h-6 mb-2" />}
                      <div className="font-medium text-base leading-tight mb-2 text-black dark:text-white">
                        {title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-stone-400 leading-snug line-clamp-3">
                        {page.frontMatter?.description ||
                          "No description available"}
                      </div>
                    </div>
                    <a
                      href={page.route}
                      className="mt-auto text-xs font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      View Docs <ArrowRightIcon className="w-3 h-3" />
                    </a>
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

export default IntegrationsIndex; 