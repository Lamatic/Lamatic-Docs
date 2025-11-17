"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { titleToSlug } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  MessageSquare,
  Workflow,
  Globe,
  Search,
  Users,
  Settings,
  Code,
  Cpu,
  Bot,
  BarChart3,
  CheckCircle,
  ExternalLink,
  Loader2,
  AlertCircle,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Wrench,
  FileText,
  Image as ImageIcon,
  Rocket,
  TrendingUp,
  Phone,
  DollarSign,
  Database,
  Grid3X3,
  Lock,
  Zap,
  FolderOpen,
  Infinity,
} from "lucide-react";
import IconGithub from "@/components/icons/github";

type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  complexity: "beginner" | "intermediate" | "advanced";
  features: string[];
  useCases: string[];
  integrations: string[];
  icon: string;
  iconColor: string;
  href?: string;
  industry?: string[];
  previewImage?: string;
  maker?: {
    name: string;
    link?: string;
  };
  nodesUsed?: Array<{
    name: string;
    label: string;
  }>;
  slug?: string;
  demoUrl?: string;
  isPro?: boolean;
  isAgentkit?: boolean;
};

type TemplatesResponse = {
  templates: Template[];
  categories: Array<{
    id: string;
    label: string;
    count: number;
  }>;
};

// Icon mapping
const iconMap: Record<string, any> = {
  Brain,
  MessageSquare,
  Workflow,
  Globe,
  Search,
  Users,
  Settings,
  Code,
  Cpu,
  Bot,
  BarChart3,
};

// Tag icon mapping
const tagIconMap: Record<string, any> = {
  Tools: Wrench,
  Generative: Sparkles,
  Document: FileText,
  Image: ImageIcon,
  Startup: Rocket,
  Growth: TrendingUp,
  Support: Phone,
  Sales: DollarSign,
  Database: Database,
  Apps: Grid3X3,
  Reasoning: Brain,
  Compliance: Lock,
};

// AgentKit category mapping
const agentKitCategories = ["Agentic", "Automation", "Embedded", "Assistant"];

export default function TemplateGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAgentKitCategory, setSelectedAgentKitCategory] = useState<
    string | null
  >(null);
  const [isClient, setIsClient] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agentKitScrollPosition, setAgentKitScrollPosition] = useState(0);
  const agentKitCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/templates-public");

        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }

        const data: TemplatesResponse = await response.json();
        setTemplates(data.templates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchTemplates();
    }
  }, [isClient]);

  // Get all unique tags from templates
  const allTags = Array.from(
    new Set(templates.flatMap((template) => template.tags))
  ).sort();

  // Separate AgentKit templates from regular templates
  const agentKitTemplates = templates.filter((template) => template.isAgentkit);
  const regularTemplates = templates.filter((template) => !template.isAgentkit);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((selectedTag) =>
        template.tags.some(
          (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
        )
      );

    // Filter out AgentKit templates from regular grid (they're shown in featured section)
    const isNotAgentKit = !template.isAgentkit;

    return matchesSearch && matchesTags && isNotAgentKit;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Carousel scroll functions
  const scrollAgentKitCarousel = (direction: "left" | "right") => {
    if (!agentKitCarouselRef.current) return;
    const scrollAmount = 400;
    const currentScroll = agentKitCarouselRef.current.scrollLeft;
    const newPosition =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
    agentKitCarouselRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  // Update scroll position when user scrolls manually
  useEffect(() => {
    const carousel = agentKitCarouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      setAgentKitScrollPosition(carousel.scrollLeft);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [agentKitTemplates.length]);

  // Always render the same structure, but disable interactions during SSR
  const isSSR = !isClient;

  // Show loading state
  if (loading) {
    return (
      <div className="mb-8">
        {/* Header with search */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Templates
            </h2>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <div className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse h-10"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full">
          {/* Featured AgentKit Section Skeleton */}
          <div className="mb-8 relative bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-2xl p-4 border border-pink-100 dark:border-pink-900/30 animate-pulse">
            {/* Dotted pattern background */}
            <div
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, #ec4899 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-0">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between mb-0">
                <div className="flex-1 mb-8">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>

              {/* Carousel Skeleton */}
              <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[280px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      {/* Icons row skeleton */}
                      <div className="flex items-center gap-1.5 mb-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
                          ></div>
                        ))}
                      </div>
                      {/* Title skeleton */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      </div>
                      {/* Description skeleton */}
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Filters Section Skeleton */}
          <div className="mb-8 space-y-4">
            {/* Tags Skeleton */}
            <div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 animate-pulse h-8 w-20"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse"
              >
                {/* Icons row skeleton */}
                <div className="flex items-center gap-1.5 mb-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
                    ></div>
                  ))}
                </div>
                {/* Title skeleton */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
                {/* Description skeleton */}
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mb-8">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Failed to load templates
          </h3>
          <div className="text-muted-foreground mb-4">{error}</div>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mx-auto"
          >
            <Loader2 className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Template card component
  const TemplateCard = ({ template }: { template: Template }) => {
    const IconComponent = iconMap[template.icon] || Brain;
    const templateSlug = template.slug || titleToSlug(template.title);
    const href = templateSlug
      ? template.isAgentkit
        ? `/agentkits/${templateSlug}`
        : `/templates/${templateSlug}`
      : "#";

    // Different styling for AgentKit cards (stacked effect)
    if (template.isAgentkit) {
      return (
        <div
          className="relative"
          style={{ paddingTop: "12px", overflow: "visible" }}
        >
          {/* Stacked card effect layers - creating depth from top */}
          <div
            className="absolute left-0 right-0 rounded-t-xl border-2 border-b-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            style={{
              top: "4px",
              height: "calc(100% - 4px)",
              zIndex: 1,
            }}
          />
          <div
            className="absolute left-0 right-0 rounded-t-xl border-2 border-b-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-60"
            style={{
              top: "0px",
              height: "calc(100% - 0px)",
              zIndex: 0,
            }}
          />

          {/* Main card content */}
          <Link
            href={href}
            className="group relative border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 bg-white dark:bg-gray-800 group-hover:border-red-400 dark:group-hover:border-red-600 transition-all duration-200 shadow-sm block z-10"
          >
            {/* Icons row at top */}
            {template.integrations && template.integrations.length > 0 && (
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {template.integrations.slice(0, 5).map((integration, idx) => {
                  // Try to map integration names to icons
                  const integrationLower = integration.toLowerCase();
                  let IntegrationIcon = null;

                  if (integrationLower.includes("google"))
                    IntegrationIcon = Globe;
                  else if (
                    integrationLower.includes("openai") ||
                    integrationLower.includes("llm")
                  )
                    IntegrationIcon = Brain;
                  else if (
                    integrationLower.includes("api") ||
                    integrationLower.includes("http")
                  )
                    IntegrationIcon = Code;
                  else if (
                    integrationLower.includes("database") ||
                    integrationLower.includes("db")
                  )
                    IntegrationIcon = Database;
                  else if (
                    integrationLower.includes("vector") ||
                    integrationLower.includes("rag")
                  )
                    IntegrationIcon = Search;
                  else if (
                    integrationLower.includes("workflow") ||
                    integrationLower.includes("automation")
                  )
                    IntegrationIcon = Workflow;
                  else if (
                    integrationLower.includes("chat") ||
                    integrationLower.includes("message")
                  )
                    IntegrationIcon = MessageSquare;
                  else if (
                    integrationLower.includes("image") ||
                    integrationLower.includes("vision")
                  )
                    IntegrationIcon = ImageIcon;
                  else if (
                    integrationLower.includes("infinity") ||
                    integrationLower.includes("unlimited")
                  )
                    IntegrationIcon = Infinity;
                  else IntegrationIcon = Zap;

                  return IntegrationIcon ? (
                    <div
                      key={idx}
                      className="w-5 h-5 flex items-center justify-center text-gray-600 dark:text-gray-400"
                      title={integration}
                    >
                      <IntegrationIcon className="w-4 h-4" />
                    </div>
                  ) : null;
                })}
                {template.integrations.length > 5 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    +{template.integrations.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Title with icon */}
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${template.iconColor}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                {template.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {template.description}
            </p>
          </Link>
        </div>
      );
    }

    // Regular template card styling
    return (
      <Link
        href={href}
        className="group relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 block bg-white dark:bg-gray-800"
      >
        {/* Icons row at top */}
        {/* {template.integrations && template.integrations.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            {template.integrations.slice(0, 5).map((integration, idx) => {
              // Try to map integration names to icons
              const integrationLower = integration.toLowerCase();
              let IntegrationIcon = null;

              if (integrationLower.includes("google")) IntegrationIcon = Globe;
              else if (
                integrationLower.includes("openai") ||
                integrationLower.includes("llm")
              )
                IntegrationIcon = Brain;
              else if (
                integrationLower.includes("api") ||
                integrationLower.includes("http")
              )
                IntegrationIcon = Code;
              else if (
                integrationLower.includes("database") ||
                integrationLower.includes("db")
              )
                IntegrationIcon = Database;
              else if (
                integrationLower.includes("vector") ||
                integrationLower.includes("rag")
              )
                IntegrationIcon = Search;
              else if (
                integrationLower.includes("workflow") ||
                integrationLower.includes("automation")
              )
                IntegrationIcon = Workflow;
              else if (
                integrationLower.includes("chat") ||
                integrationLower.includes("message")
              )
                IntegrationIcon = MessageSquare;
              else if (
                integrationLower.includes("image") ||
                integrationLower.includes("vision")
              )
                IntegrationIcon = ImageIcon;
              else if (
                integrationLower.includes("infinity") ||
                integrationLower.includes("unlimited")
              )
                IntegrationIcon = Infinity;
              else IntegrationIcon = Zap;

              return IntegrationIcon ? (
                <div
                  key={idx}
                  className="w-5 h-5 flex items-center justify-center text-gray-600 dark:text-gray-400"
                  title={integration}
                >
                  <IntegrationIcon className="w-4 h-4" />
                </div>
              ) : null;
            })}
            {template.integrations.length > 5 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                +{template.integrations.length - 5}
              </span>
            )}
          </div>
        )} */}

        {/* Title with icon */}
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 rounded-lg ${template.iconColor}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
            {template.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {template.description}
        </p>
      </Link>
    );
  };

  return (
    <div className="mb-8">
      {/* Header with search */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <FolderOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" /> */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Templates
          </h2>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search templates by name"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={isSSR ? "" : searchTerm}
            onChange={isSSR ? undefined : (e) => setSearchTerm(e.target.value)}
            disabled={isSSR}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        {/* Featured AgentKit Section */}
        {agentKitTemplates.length > 0 && (
          <div className="mb-8 relative bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-2xl p-4 border border-pink-100 dark:border-pink-900/30">
            {/* Dotted pattern background */}
            <div
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, #ec4899 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-0">
              {/* Header */}
              <div className="flex items-center justify-between mb-0">
                <div className="flex-1 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    AgentKit
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Opensource Full Stack Agentic Apps in minutes built by the
                    community.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <Link href="https://git.new/agentkit" target="_blank">
                    <IconGithub className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </Link>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    asChild
                  >
                    <Link href="/agentkits">Explore</Link>
                  </Button>
                </div>
              </div>

              {/* Description */}
              {/* <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Opensource Full Stack Agentic Apps in minutes built by the community.
                </p> */}

              {/* Carousel */}
              <div className="relative overflow-visible">
                <div
                  ref={agentKitCarouselRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth pb-4 hide-scrollbar overflow-y-visible"
                  style={{ overflowY: "visible" }}
                >
                  {agentKitTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex-shrink-0 w-[280px] overflow-visible"
                      style={{ overflow: "visible" }}
                    >
                      <TemplateCard template={template} />
                    </div>
                  ))}
                </div>

                {/* Navigation arrows */}
                {agentKitTemplates.length > 4 && (
                  <>
                    <button
                      onClick={() => scrollAgentKitCarousel("left")}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-20"
                      disabled={isSSR}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollAgentKitCarousel("right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-20"
                      disabled={isSSR}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Filters Section */}
        <div className="mb-8 space-y-4">
          {/* All Templates */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              All Templates
            </h3>
          </div>

          {/* AgentKit Section */}
          {/* <div>
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AgentKit</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {agentKitCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      !isSSR &&
                      setSelectedAgentKitCategory(
                        selectedAgentKitCategory === category ? null : category
                      )
                    }
                    disabled={isSSR}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      selectedAgentKitCategory === category
                        ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div> */}

          {/* Tags Section */}
          <div>
            {/* <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags</h3> */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const TagIcon = tagIconMap[tag] || null;
                return (
                  <button
                    key={tag}
                    onClick={() => !isSSR && toggleTag(tag)}
                    disabled={isSSR}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
                      selectedTags.includes(tag)
                        ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {TagIcon && <TagIcon className="w-3 h-3" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Section */}
          {/* <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Personal
              </h3>
            </div> */}

          {/* Team Section */}
          {/* <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Team
              </h3>
            </div> */}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(isSSR ? regularTemplates.slice(0, 6) : filteredTemplates).map(
            (template) => (
              <TemplateCard key={template.id} template={template} />
            )
          )}
        </div>

        {!isSSR && filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No templates found
            </h3>
            <div className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
