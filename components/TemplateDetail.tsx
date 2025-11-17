"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
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
  ArrowLeft,
  Tag,
  Zap,
  Layers,
  Link as LinkIcon,
  BookOpen,
  MessageCircle,
  Target,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageCollage } from "@/components/ImageCollage";
import { FAQAccordion } from "@/components/FAQAccordion";

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
  about?: any;
  inputs?: any;
  testInput?: any;
  ux?: any;
  datasource?: any;
  compatibleSources?: any;
  config?: string;
  v0Link?: string | null;
  template_link?: string | null;
  agent_link?: string | null;
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

const getTypeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "agentic":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
    case "assistant":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
    case "automation":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
    case "embedded":
    case "embed":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

export default function TemplateDetail() {
  const router = useRouter();
  const { templateID, agentID } = router.query;
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  // Determine if we're on agentkits route or templates route
  const isAgentkitRoute = router.pathname.includes("/agentkits/");
  const id = isAgentkitRoute ? agentID : templateID;

  useEffect(() => {
    if (!id) return;

    // Convert GitHub blob/tree URL to raw content URL
    const convertToRawUrl = (githubUrl: string): string => {
      try {
        // Example: https://github.com/Lamatic/AgentKit/tree/main/templates/hiring-agent
        // Convert to: https://raw.githubusercontent.com/Lamatic/AgentKit/refs/heads/main/templates/hiring-agent/README.md
        
        const url = new URL(githubUrl);
        const pathParts = url.pathname.split('/').filter(part => part); // Remove empty strings
        
        // Find the index of 'blob' or 'tree' to understand the structure
        const blobIndex = pathParts.indexOf('blob');
        const treeIndex = pathParts.indexOf('tree');
        const index = blobIndex !== -1 ? blobIndex : treeIndex;
        
        if (index !== -1 && pathParts.length > index + 1) {
          // Format: /owner/repo/blob|tree/branch/path/to/file
          const owner = pathParts[0];
          const repo = pathParts[1];
          const branch = pathParts[index + 1];
          const filePath = pathParts.slice(index + 2).join('/');
          
          // Ensure filePath ends with / before appending README.md
          const normalizedPath = filePath ? (filePath.endsWith('/') ? filePath : filePath + '/') : '';
          
          // Construct raw URL with refs/heads/ prefix
          const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/${branch}/${normalizedPath}README.md`;
          return rawUrl;
        }
        
        // Alternative: if no 'blob' or 'tree' in path, assume format is /owner/repo/branch/path
        if (pathParts.length >= 3) {
          const owner = pathParts[0];
          const repo = pathParts[1];
          const branch = pathParts[2];
          const filePath = pathParts.slice(3).join('/');
          const normalizedPath = filePath ? (filePath.endsWith('/') ? filePath : filePath + '/') : '';
          return `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/${branch}/${normalizedPath}README.md`;
        }
        
        // Fallback: just append README.md to the original URL
        return githubUrl.endsWith('/') ? githubUrl + 'README.md' : githubUrl + '/README.md';
      } catch (err) {
        console.error('Error converting GitHub URL:', err, githubUrl);
        return githubUrl.endsWith('/') ? githubUrl + 'README.md' : githubUrl + '/README.md';
      }
    };

    // Fetch README content from GitHub
    const fetchReadme = async (githubUrl: string) => {
      try {
        setReadmeLoading(true);
        setReadmeError(null);
        
        const rawUrl = convertToRawUrl(githubUrl);
        const response = await fetch(rawUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch README: ${response.status}`);
        }
        
        const content = await response.text();
        setReadmeContent(content);
      } catch (err) {
        setReadmeError(err instanceof Error ? err.message : 'Failed to fetch README');
        console.error('Error fetching README:', err);
      } finally {
        setReadmeLoading(false);
      }
    };

    const fetchTemplate = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use appropriate API endpoint based on route
        const apiEndpoint = isAgentkitRoute
          ? `/api/agentkits/${id}`
          : `/api/templates/${id}`;
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Template not found");
          }
          throw new Error("Failed to fetch template");
        }

        const data: Template = await response.json();
        setTemplate(data);
        
        // Fetch README if template_link or agent_link exists
        const githubUrl = data.template_link || data.agent_link;
        if (githubUrl) {
          fetchReadme(githubUrl);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching template:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, isAgentkitRoute]);

  // Update document title dynamically
  useEffect(() => {
    if (template) {
      document.title = `${template.title} - ${isAgentkitRoute ? "AgentKit" : "Template"} | Lamatic`;
    } else if (loading) {
      document.title = isAgentkitRoute
        ? "Loading AgentKit... | Lamatic"
        : "Loading Template... | Lamatic";
    } else if (error) {
      document.title = `${error} | Lamatic`;
    }
  }, [template, loading, error, isAgentkitRoute]);

  if (loading) {
    return (
      <>
        <Head>
          <title>
            {isAgentkitRoute
              ? "Loading AgentKit... | Lamatic"
              : "Loading Template... | Lamatic"}
          </title>
        </Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
          .shimmer {
            animation: shimmer 2s infinite linear;
            background: linear-gradient(
              to right,
              rgb(229, 231, 235) 0%,
              rgb(243, 244, 246) 20%,
              rgb(229, 231, 235) 40%,
              rgb(229, 231, 235) 100%
            );
            background-size: 1000px 100%;
          }
          .dark .shimmer {
            background: linear-gradient(
              to right,
              rgb(55, 65, 81) 0%,
              rgb(75, 85, 99) 20%,
              rgb(55, 65, 81) 40%,
              rgb(55, 65, 81) 100%
            );
            background-size: 1000px 100%;
          }
        `,
          }}
        />
        <div className="mx-auto py-8">
          {/* Back Navigation Skeleton */}
          <div className="mb-6">
            <div className="h-4 w-24 shimmer rounded"></div>
          </div>

          {/* Hero Section Skeleton */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-16 shimmer rounded-full"></div>
              <div className="h-6 w-20 shimmer rounded-full"></div>
            </div>
            <div className="h-10 w-3/4 shimmer rounded mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full shimmer rounded"></div>
              <div className="h-4 w-5/6 shimmer rounded"></div>
              <div className="h-4 w-4/6 shimmer rounded"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <div className="h-10 w-32 shimmer rounded"></div>
              <div className="h-10 w-28 shimmer rounded"></div>
            </div>
          </div>

          {/* Main Content Layout Skeleton */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview Section Skeleton */}
              <section>
                <div className="h-8 w-32 shimmer rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full shimmer rounded"></div>
                  <div className="h-4 w-full shimmer rounded"></div>
                  <div className="h-4 w-5/6 shimmer rounded"></div>
                </div>
              </section>

              {/* Key Features Section Skeleton */}
              <section>
                <div className="h-8 w-40 shimmer rounded mb-4"></div>
                <div className="grid md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 shimmer rounded-full flex-shrink-0 mt-0.5"></div>
                      <div className="h-4 w-32 shimmer rounded"></div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Nodes Used Section Skeleton */}
              <section>
                <div className="h-8 w-36 shimmer rounded mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-7 w-20 shimmer rounded-full"
                    ></div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar Skeleton */}
            <div className="space-y-6">
              {/* Quick Start Section Skeleton */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                <div className="h-6 w-28 shimmer rounded mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 shimmer rounded-full flex-shrink-0"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-3 w-full shimmer rounded"></div>
                        <div className="h-3 w-4/5 shimmer rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="h-3 w-32 shimmer rounded mb-1"></div>
                  <div className="h-6 w-24 shimmer rounded"></div>
                </div>
              </div>

              {/* Template Info Skeleton */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <div className="h-6 w-32 shimmer rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <div className="h-4 w-20 shimmer rounded"></div>
                    <div className="h-5 w-16 shimmer rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="h-4 w-20 shimmer rounded"></div>
                    <div className="h-5 w-16 shimmer rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="h-4 w-24 shimmer rounded"></div>
                    <div className="h-4 w-8 shimmer rounded"></div>
                  </div>
                </div>
              </div>

              {/* Tags Skeleton */}
              <div>
                <div className="h-6 w-20 shimmer rounded mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-6 w-16 shimmer rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !template) {
    return (
      <>
        <Head>
          <title>
            {error
              ? `${error} | Lamatic`
              : isAgentkitRoute
              ? "AgentKit Not Found | Lamatic"
              : "Template Not Found | Lamatic"}
          </title>
        </Head>
        <div className="flex items-center justify-center min-h-[60vh] py-12">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error || "Template not found"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "The template you are looking for does not exist."}
          </p>
          <Button onClick={() => router.push("/templates")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
        </div>
      </div>
      </>
    );
  }

  const IconComponent = iconMap[template.icon] || Brain;
  const previewImages = template.previewImage
    ? [
        `https://api.lamatic.ai/storage/v1/object/public/workflow-previews/${template.previewImage}`,
      ]
    : [];

  return (
    <>
      <Head>
        <title>
          {template
            ? `${template.title} - ${isAgentkitRoute ? "AgentKit" : "Template"} | Lamatic`
            : isAgentkitRoute
            ? "AgentKit Details | Lamatic"
            : "Template Details | Lamatic"}
        </title>
        <meta
          name="description"
          content={
            template?.description ||
            `View details for this ${isAgentkitRoute ? "AgentKit" : "template"} on Lamatic`
          }
        />
      </Head>
      <div className="mx-auto py-8">
        {/* Back Navigation */}
        <div className="mb-6">
        <Link
          href={isAgentkitRoute ? "/agentkits" : "/templates"}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {isAgentkitRoute ? "AgentKits" : "Templates"}
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {/* <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(template.category)}`}>
            {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
          </span> */}
          {template.isPro && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
              Pro
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {template.complexity.charAt(0).toUpperCase() +
              template.complexity.slice(1)}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {template.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          {template.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          {template.slug && (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 text-sm font-semibold flex items-center gap-2 shadow-sm"
              onClick={() =>
                window.open(
                  `https://studio.lamatic.ai/_?templateSlug=${template.slug}`,
                  "_blank"
                )
              }
            >
              Use Template
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}

          {template.demoUrl && (
            <Button
              variant="outline"
              className="px-6 py-2.5 text-sm font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => window.open(template.demoUrl, "_blank")}
            >
              View Demo
            </Button>
          )}

          {template.v0Link && (
            <Button
              variant="outline"
              className="px-6 py-2.5 text-sm font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => window.open(template.v0Link!, "_blank")}
            >
              View on v0
              <LinkIcon className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Images */}
      {/* {previewImages.length > 0 && (
        <div className="mb-12">
          <ImageCollage
            images={previewImages}
            alt={`${template.title} Screenshot`}
            className="my-6"
            columns={1}
            gap="4"
            showLightbox={true}
          />
        </div>
      )} */}

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {template.description}
            </p>
          </section>

          {/* Key Features Section */}
          {template.features && template.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Nodes Used Section */}
          {/* {template.nodesUsed && template.nodesUsed.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Components Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {template.nodesUsed.map((node, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-sm py-1.5 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-default"
                  >
                    {node.label || node.name}
                  </Badge>
                ))}
              </div>
            </section>
          )} */}

          {/* Integrations Section */}
          {/* {template.integrations && template.integrations.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Integrations
              </h2>
              <div className="flex flex-wrap gap-2">
                {template.integrations.map((integration, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-sm py-1.5 px-3"
                  >
                    {integration}
                  </Badge>
                ))}
              </div>
            </section>
          )} */}

          {/* Nodes Used Section */}
          {template.nodesUsed && template.nodesUsed.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Nodes Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {template.nodesUsed.map((node, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm py-1.5 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-default"
                  >
                    {node.label || node.name}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* About Section */}
          {template.about && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                About This Template
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                {typeof template.about === "string" ? (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {template.about}
                  </p>
                ) : (
                  <pre className="text-sm whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    {JSON.stringify(template.about, null, 2)}
                  </pre>
                )}
              </div>
            </section>
          )}

          {/* README Section */}
          {(readmeContent || readmeLoading || readmeError) && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Documentation
              </h2>
              {readmeLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    Loading README...
                  </span>
                </div>
              )}
              {readmeError && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        Could not load README
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                        {readmeError}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {readmeContent && !readmeLoading && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-red-600 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-red-600 dark:prose-code:text-red-400 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-6 first:mt-0 border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-6 border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-5" {...props} />
                        ),
                        h4: ({ node, ...props }) => (
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-4" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />
                        ),
                        code: ({ node, inline, className, children, ...props }: any) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const language = match ? match[1] : '';
                          
                          if (!inline && language) {
                            return (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={language}
                                PreTag="div"
                                className="rounded-lg mb-4 border border-gray-800 dark:border-gray-700"
                                customStyle={{
                                  margin: 0,
                                  borderRadius: '0.5rem',
                                  padding: '1rem',
                                }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            );
                          }
                          
                          if (!inline) {
                            return (
                              <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-800 dark:border-gray-700">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            );
                          }
                          
                          return (
                            <code
                              className="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm font-mono"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        pre: ({ node, children, ...props }: any) => {
                          // If the pre contains a code element with SyntaxHighlighter, don't wrap it
                          if (children && typeof children === 'object' && 'props' in children && children.props.className?.includes('language-')) {
                            return <>{children}</>;
                          }
                          return (
                            <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-800 dark:border-gray-700" {...props}>
                              {children}
                            </pre>
                          );
                        },
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc list-outside mb-4 ml-6 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="list-decimal list-outside mb-4 ml-6 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />
                        ),
                        a: ({ node, href, ...props }) => (
                          <a
                            href={href}
                            className="text-red-600 dark:text-red-400 hover:underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-red-500 dark:border-red-400 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-gray-100 dark:bg-gray-800/50 py-2 rounded-r"
                            {...props}
                          />
                        ),
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
                        ),
                        tbody: ({ node, ...props }) => (
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" {...props} />
                        ),
                        hr: ({ node, ...props }) => (
                          <hr className="my-6 border-gray-200 dark:border-gray-700" {...props} />
                        ),
                        img: ({ node, src, alt, ...props }) => (
                          <img
                            src={src}
                            alt={alt}
                            className="rounded-lg border border-gray-200 dark:border-gray-700 my-4 max-w-full h-auto"
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="italic" {...props} />
                        ),
                        div: ({ node, className, style, ...props }: any) => {
                          // Handle HTML divs from markdown
                          if (className || style) {
                            return <div className={className} style={style} {...props} />;
                          }
                          return <div {...props} />;
                        },
                        span: ({ node, className, style, ...props }: any) => {
                          // Handle HTML spans from markdown
                          if (className || style) {
                            return <span className={className} style={style} {...props} />;
                          }
                          return <span {...props} />;
                        },
                      }}
                    >
                      {readmeContent}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Start Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Quick Start
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Click "Use Template" to open in Studio
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Configure your template settings
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Customize to match your needs
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Deploy and start using
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Estimated setup time
              </p>
              <p className="text-lg font-bold text-red-500">~5 minutes</p>
            </div>
          </div>

          {/* Template Info */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Template Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Complexity:
                </span>
                <Badge variant="outline" className="text-xs">
                  {template.complexity.charAt(0).toUpperCase() +
                    template.complexity.slice(1)}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Category:
                </span>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
              {template.nodesUsed && (
                <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Components:
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {template.nodesUsed.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {template.tags && template.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Industry */}
          {template.industry && template.industry.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.industry.map((industry, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Maker */}
          {template.maker && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                Created By
              </h3>
              {template.maker.link ? (
                <a
                  href={template.maker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 dark:text-red-400 hover:underline text-sm font-medium"
                >
                  {template.maker.name}
                </a>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {template.maker.name}
                </p>
              )}
            </div>
          )}

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              Resources
            </h3>
            <div className="space-y-2">
              {template.slug && (
                <a
                  href={`https://studio.lamatic.ai/_?templateSlug=${template.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Open in Studio
                  </span>
                </a>
              )}
              <a
                href="/docs"
                className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Documentation
                </span>
              </a>
              <a
                href="/docs/slack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Community Support
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      {template.useCases && template.useCases.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {template.useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {useCase}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}
      </div>
    </>
  );
}
