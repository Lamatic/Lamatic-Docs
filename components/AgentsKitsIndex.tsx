import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import Link from "next/link";
import { ArrowRightIcon, Bot, Zap, Settings, Users, Brain } from "lucide-react";

const SECTION_DESCRIPTIONS: Record<string, string> = {
  "conversational": "AI agents designed for natural language conversations, customer support, and interactive experiences.",
  "automation": "Intelligent agents that automate repetitive tasks, workflows, and business processes.",
  "analytics": "Data-driven agents that analyze information, generate insights, and provide recommendations.",
  "specialized": "Domain-specific agents tailored for particular industries, use cases, or specialized tasks.",
};

const SECTION_ORDER = ["conversational", "automation", "analytics", "specialized"];

const SECTION_ICONS: Record<string, any> = {
  "conversational": Bot,
  "automation": Zap,
  "analytics": Brain,
  "specialized": Users,
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

const AgentsKitsIndex = () => {
  // Get all pages under /agents-kits (including subfolders)
  const allPages = getPagesUnderRoute("/agents-kits");
  const pages = flattenPages(allPages).filter(
    (page) => page.route !== "/agents-kits" && page.route !== "/pages/agents-kits"
  );

  // Group by type/category
  const groupedPages = pages.reduce((acc, page) => {
    // Extract category from the route path
    const routeParts = page.route.split('/');
    let category = "other";
    
    // Check if the route contains one of our known categories
    if (routeParts.includes("conversational")) {
      category = "conversational";
    } else if (routeParts.includes("automation")) {
      category = "automation";
    } else if (routeParts.includes("analytics")) {
      category = "analytics";
    } else if (routeParts.includes("specialized")) {
      category = "specialized";
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
        const categoryTitle = category === "conversational" ? "Conversational Agents" : 
                             category === "automation" ? "Automation Agents" : 
                             category === "analytics" ? "Analytics Agents" : 
                             category === "specialized" ? "Specialized Agents" : category;
        
        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2 mb-1 ">
              {IconComponent && <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />}
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

export default AgentsKitsIndex;
