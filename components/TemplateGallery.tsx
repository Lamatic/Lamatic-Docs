"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { titleToSlug } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

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
  BarChart3
};

export default function TemplateGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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
        const response = await fetch('/api/templates-public');
        
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        
        const data: TemplatesResponse = await response.json();
        setTemplates(data.templates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchTemplates();
    }
  }, [isClient]);

  // Get all unique tags from templates
  const allTags = Array.from(new Set(templates.flatMap(template => template.tags))).sort();

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(selectedTag => 
                         template.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
                       );
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Always render the same structure, but disable interactions during SSR
  const isSSR = !isClient;

  // Show loading state
  if (loading) {
    return (
      <div className="mb-8">
        <div className="mb-6">
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <div className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse h-10"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 animate-pulse h-8 w-16"></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 animate-pulse">
              {/* Preview Image Placeholder */}
              <div className="mb-4 rounded-lg bg-gray-200 dark:bg-gray-700 h-32"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg w-10 h-10"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="space-y-2 mb-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                ))}
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load templates</h3>
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

  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={isSSR ? "" : searchTerm}
            onChange={isSSR ? undefined : (e) => setSearchTerm(e.target.value)}
            disabled={isSSR}
          />
        </div>
        
        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => !isSSR && toggleTag(tag)}
                disabled={isSSR}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => !isSSR && setSelectedTags([])}
                disabled={isSSR}
                className="px-3 py-1 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {(isSSR ? templates.slice(0, 6) : filteredTemplates).map(template => {
          const IconComponent = iconMap[template.icon] || Brain; // Fallback to Brain icon
          // Use title-based slug for the URL
          const templateSlug = titleToSlug(template.title);
          return (
            <Link
              key={template.id}
              href={templateSlug ? `/templates/${templateSlug}` : '#'}
              className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 block"
            >
              {/* Preview Image */}
              {template.previewImage && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={`https://api.lamatic.ai/storage/v1/object/public/workflow-previews/${template.previewImage}`}
                    alt={template.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      // Hide image if it fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${template.iconColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{template.title}</h3>
                  <div className="flex gap-2">
                    {/* <Badge variant="secondary" className="text-xs">{template.category}</Badge> */}
                    <Badge variant="outline" className="text-xs">
                      {template.complexity.charAt(0).toUpperCase() + template.complexity.slice(1)}
                    </Badge>
                    {template.isPro && (
                      <Badge variant="default" className="text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                        Pro
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-4">{template.description}</div>
              <div className="space-y-2 mb-4">
                {template.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mb-4">
                {template.industry && template.industry.slice(0, 2).map((industry, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {industry}
                  </Badge>
                ))}
              </div>
              {/* Maker 
              {template.maker && (
                <div className="text-xs text-muted-foreground mb-3">
                  Created by {template.maker.name}
                </div>
              )}
                */}
              {/* Actions 
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1" 
                  disabled={isSSR}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSSR && template.slug) {
                      window.open(`https://studio.lamatic.ai/_?templateSlug=${template.slug}`, '_blank');
                    }
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Template
                </Button>
                {template.demoUrl && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1" 
                    disabled={isSSR}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSSR && template.demoUrl) {
                        window.open(template.demoUrl, '_blank');
                      }
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                )}
              </div>
              */}
            </Link>
          );
        })}
      </div>
      
      {!isSSR && filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No templates found</h3>
          <div className="text-muted-foreground">Try adjusting your search or filter criteria.</div>
        </div>
      )}
    </div>
  );
}
