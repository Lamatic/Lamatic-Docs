import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  Users,
} from "lucide-react";

const SECTION_DESCRIPTIONS: Record<string, string> = {
  Agentic:
    "Advanced AI agents with reasoning capabilities that can think, plan, and execute complex tasks autonomously.",
  Assistant:
    "Intelligent conversational assistants designed for customer support, help desks, and interactive experiences.",
  Automation:
    "Workflow automation agents that streamline repetitive tasks and business processes with intelligent decision making.",
  Embed:
    "Lightweight agents designed for integration into existing applications, websites, and digital products.",
  Misc: "Miscellaneous agent kits that don't fit into the other categories.",
};

const SECTION_COLORS: Record<string, string> = {
  Agentic: "bg-gradient-to-r from-purple-500 to-pink-500",
  Assistant: "bg-gradient-to-r from-blue-500 to-cyan-500",
  Automation: "bg-gradient-to-r from-green-500 to-emerald-500",
  Embed: "bg-gradient-to-r from-orange-500 to-red-500",
  Misc: "bg-gradient-to-r from-gray-500 to-slate-500",
};

const SECTION_ORDER = ["Agentic", "Assistant", "Automation", "Embed", "Misc"];

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

// Loading skeleton component
const CardSkeleton = () => (
  <Card className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
    <CardHeader className="pb-0 pt-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-4"></div>
    </CardContent>
  </Card>
);

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

  // Extract cover image from agentKitData via API
  const [coverImage, setCoverImage] = React.useState<string | null>(null);
  const [imagesAlt, setImagesAlt] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchAgentKitData = async () => {
      if (!page.route) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/agent-kit-data?route=${encodeURIComponent(page.route)}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            setCoverImage(data.images[0]); // First image is the cover
            setImagesAlt(data.imagesAlt || "");
          }
        }
      } catch (error) {
        console.error("Error fetching agent kit data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgentKitData();
  }, [page.route]);

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <Card className="group relative rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-black/80 backdrop-blur-sm overflow-hidden  transition-all duration-300 ">
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0  transition-opacity duration-300 z-10" />

      {/* Thumbnail Image */}
      {coverImage ? (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={coverImage}
            alt={imagesAlt || title}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      ) : (
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <IconComponent className="w-16 h-16 text-gray-400 dark:text-gray-600" />
        </div>
      )}

      <CardHeader className="pb-2 pt-4 relative z-20">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 line-clamp-2">
            {title}
          </CardTitle>
          {/* <div className="flex items-center space-x-1 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-500 dark:text-gray-400">4.8</span>
          </div> */}
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-20">
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3 transition-colors duration-300">
          {page.frontMatter?.description || "No description available"}
        </CardDescription>

        <div className="flex items-center justify-between mt-4">
          {/* <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Clock className="w-3 h-3 mr-1" />
              {Math.floor(Math.random() * 5) + 1} min
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {Math.floor(Math.random() * 100) + 10} users
            </Badge>
          </div> */}

          <Link
            href={page.route}
            className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:scale-105"
          >
            View
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const AgentsKitsIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get all pages under /templates/agentkits (including subfolders)
  const allPages = getPagesUnderRoute("/templates/agentkits");
  const pages = flattenPages(allPages).filter(
    (page) =>
      page.route !== "/templates/agentkits" &&
      page.route !== "/templates/agentkits/index"
  );

  // Group by type/category from route path or frontmatter
  const groupedPages = pages.reduce((acc, page) => {
    let type = page.frontMatter?.type;

    // If no type in frontmatter, extract from route path
    if (!type) {
      const routeParts = page.route.split("/");
      const categoryIndex = routeParts.findIndex(
        (part) => part === "agentkits"
      );
      if (categoryIndex !== -1 && routeParts[categoryIndex + 1]) {
        type = routeParts[categoryIndex + 1];
      }
    }

    // Normalize type names
    if (type) {
      type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    } else {
      type = "Other";
    }

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

  // Filter and search logic
  const filteredPages = useMemo(() => {
    let filtered = pages;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((page) => {
        const title = page.frontMatter?.title || page.name || "";
        const description = page.frontMatter?.description || "";
        const searchLower = searchQuery.toLowerCase();
        return (
          title.toLowerCase().includes(searchLower) ||
          description.toLowerCase().includes(searchLower)
        );
      });
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((page) => {
        let type = page.frontMatter?.type;
        if (!type) {
          const routeParts = page.route.split("/");
          const categoryIndex = routeParts.findIndex(
            (part) => part === "agentkits"
          );
          if (categoryIndex !== -1 && routeParts[categoryIndex + 1]) {
            type = routeParts[categoryIndex + 1];
          }
        }
        if (type) {
          type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        }
        return type === selectedCategory;
      });
    }

    return filtered;
  }, [pages, searchQuery, selectedCategory]);

  // Get available categories
  const availableCategories = Object.keys(groupedPages).filter(
    (cat) => groupedPages[cat].length > 0
  );

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Agent Kits
        </h1> */}
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover powerful AI agent templates designed to accelerate your
          development and automate complex workflows.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search agent kits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500/20"
          />
        </div>

        <div className="flex items-center space-x-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-black text-sm focus:ring-2 focus:ring-red-500/20"
            >
              <option value="">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          {/* <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-red-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-red-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {filteredPages.length} agent kit{filteredPages.length !== 1 ? "s" : ""}{" "}
        found
        {searchQuery && ` for "${searchQuery}"`}
        {selectedCategory && ` in ${selectedCategory}`}
      </div>

      {/* Content */}
      {selectedCategory ? (
        // Single category view
        <div className="space-y-5">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {selectedCategory}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              {SECTION_DESCRIPTIONS[selectedCategory]}
            </p>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredPages.map((page) => (
              <AgentKitCard key={page.route} page={page} />
            ))}
          </div>
        </div>
      ) : (
        // All categories view
        <div className="space-y-0">
          {SECTION_ORDER.map((category) => {
            const categoryPages = groupedPages[category];
            if (!categoryPages || categoryPages.length === 0) return null;

            return (
              <div key={category}>
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-0">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {category}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                    {SECTION_DESCRIPTIONS[category]}
                  </p>
                </div>

                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {categoryPages.map((page) => (
                    <AgentKitCard key={page.route} page={page} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredPages.length === 0 && (
        <div className="text-center py-0">
          <div className="w-16 h-16 mx-auto mb-0 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
            No agent kits found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-0">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AgentsKitsIndex;
