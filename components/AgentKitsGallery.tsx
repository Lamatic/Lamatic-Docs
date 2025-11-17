"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { titleToSlug } from "@/lib/utils";
import {
  Brain,
  MessageSquare,
  Workflow,
  Globe,
  Search,
  Code,
  Database,
  Image as ImageIcon,
  Infinity,
  Zap,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  Code,
  Database,
  ImageIcon,
};

export default function AgentKitsGallery() {
  const [isClient, setIsClient] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        // Filter only agentkits
        const agentKitTemplates = data.templates.filter(
          (template) => template.isAgentkit
        );
        setTemplates(agentKitTemplates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching agentkits:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchTemplates();
    }
  }, [isClient]);

  // AgentKit card component with stacked effect
  const AgentKitCard = ({ template }: { template: Template }) => {
    const IconComponent = iconMap[template.icon] || Brain;
    const templateSlug = template.slug || titleToSlug(template.title);
    const href = templateSlug ? `/agentkits/${templateSlug}` : "#";

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
  };

  // Show loading state
  if (loading) {
    return (
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse"
              style={{ paddingTop: "16px" }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
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
            Failed to load agentkits
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

  // Show empty state
  if (templates.length === 0) {
    return (
      <div className="mb-8">
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No agentkits found
          </h3>
          <div className="text-muted-foreground">
            There are no agentkits available at the moment.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {templates.map((template) => (
          <AgentKitCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

