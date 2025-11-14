"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
  BarChart3
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

  // Determine if we're on agentkits route or templates route
  const isAgentkitRoute = router.pathname.includes('/agentkits/');
  const id = isAgentkitRoute ? agentID : templateID;

  useEffect(() => {
    if (!id) return;

    const fetchTemplate = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use appropriate API endpoint based on route
        const apiEndpoint = isAgentkitRoute ? `/api/agentkits/${id}` : `/api/templates/${id}`;
        const response = await fetch(apiEndpoint);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Template not found');
          }
          throw new Error('Failed to fetch template');
        }
        
        const data: Template = await response.json();
        setTemplate(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching template:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, isAgentkitRoute]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-12">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error || 'Template not found'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'The template you are looking for does not exist.'}
          </p>
          <Button onClick={() => router.push('/templates')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[template.icon] || Brain;
  const previewImages = template.previewImage 
    ? [`https://api.lamatic.ai/storage/v1/object/public/workflow-previews/${template.previewImage}`]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          href="/templates" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Templates
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
            {template.complexity.charAt(0).toUpperCase() + template.complexity.slice(1)}
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
              onClick={() => window.open(`https://studio.lamatic.ai/_?templateSlug=${template.slug}`, '_blank')}
            >
              Use Template
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          
          {template.demoUrl && (
            <Button
              variant="outline"
              className="px-6 py-2.5 text-sm font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => window.open(template.demoUrl, '_blank')}
            >
              View Demo
            </Button>
          )}

          {template.v0Link && (
            <Button
              variant="outline"
              className="px-6 py-2.5 text-sm font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => window.open(template.v0Link!, '_blank')}
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
                {typeof template.about === 'string' ? (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{template.about}</p>
                ) : (
                  <pre className="text-sm whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    {JSON.stringify(template.about, null, 2)}
                  </pre>
                )}
              </div>
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
              <p className="text-lg font-bold text-red-500">
                ~5 minutes
              </p>
            </div>
          </div>

          {/* Template Info */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Template Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Complexity:</span>
                <Badge variant="outline" className="text-xs">
                  {template.complexity.charAt(0).toUpperCase() + template.complexity.slice(1)}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
              {template.nodesUsed && (
                <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Components:</span>
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
                <p className="text-gray-700 dark:text-gray-300 text-sm">{template.maker.name}</p>
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
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {useCase}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

