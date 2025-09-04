import React from "react";
import Link from "next/link";
import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  MessageSquare,
  Workflow,
  Cpu,
  ArrowRight,
  Search,
  Bot,
  Zap,
  Settings,
  Code,
  Globe,
} from "lucide-react";

const SECTION_DESCRIPTIONS: Record<string, string> = {
  Agentic:
    "Advanced AI agents with reasoning capabilities that can think, plan, and execute complex tasks autonomously.",
  Assistant:
    "Intelligent conversational assistants designed for customer support, help desks, and interactive experiences.",
  Automation:
    "Workflow automation agents that streamline repetitive tasks and business processes with intelligent decision making.",
  Embedded:
    "Lightweight agents designed for integration into existing applications, websites, and digital products.",
};

const SECTION_ORDER = ["Agentic", "Assistant", "Automation", "Embedded"];

// Icon mapping for different agent kit types
const ICON_MAPPING: Record<string, any> = {
  "think-mode": Search,
  "advanced-reasoning": Brain,
  "chat-assistant": MessageSquare,
  "smart-assistant": Bot,
  "workflow-automation": Workflow,
  "event-driven-automation": Zap,
  "scheduled-automation": Settings,
  "api-integration": Code,
  "widget-integration": Globe,
  // Default fallback
  default: Brain,
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

const AgentKitCard = ({ page }: { page: Page & { frontMatter?: any } }) => {
  // Get icon based on page name or frontmatter
  const pageName = page.name?.toLowerCase().replace(/\s+/g, "-") || "default";
  const IconComponent = ICON_MAPPING[pageName] || ICON_MAPPING.default;

  const title =
    page.frontMatter?.title ||
    page.name
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") ||
    "Untitled";

  return (
    <Card className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          {page.frontMatter?.description || "No description available"}
        </CardDescription>

        <Link
          href={page.route}
          className="inline-flex mt-6 items-center text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          View Docs
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
};

const AgentsKitsIndex = () => {
  // Get all pages under /agentkits (including subfolders)
  const allPages = getPagesUnderRoute("/agentkits");
  const pages = flattenPages(allPages).filter(
    (page) => page.route !== "/agentkits" && page.route !== "/agentkits/index"
  );

  // Group by type/category from frontmatter
  const groupedPages = pages.reduce((acc, page) => {
    let type = page.frontMatter?.type || "Other";
    // Normalize type names
    if (type.toLowerCase() === "agentic") type = "Agentic";
    if (type.toLowerCase() === "assistant") type = "Assistant";
    if (type.toLowerCase() === "automation") type = "Automation";
    if (type.toLowerCase() === "embedded") type = "Embedded";

    if (!acc[type]) acc[type] = [];
    acc[type].push(page);
    return acc;
  }, {});

  // Sort within each category
  Object.keys(groupedPages).forEach((type) => {
    groupedPages[type].sort((a, b) => {
      const orderA = a.frontMatter?.order ?? Infinity;
      const orderB = b.frontMatter?.order ?? Infinity;
      return orderA - orderB;
    });
  });

  return (
    <div className="w-full space-y-16">
      {SECTION_ORDER.map((category) => {
        const categoryPages = groupedPages[category];
        if (!categoryPages || categoryPages.length === 0) return null;

        return (
          <div key={category}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {category}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                {SECTION_DESCRIPTIONS[category]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryPages.map((page) => (
                <AgentKitCard key={page.route} page={page} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AgentsKitsIndex;
