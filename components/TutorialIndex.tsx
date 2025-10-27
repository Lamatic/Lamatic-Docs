'use client'

import { getPagesUnderRoute } from "@/lib/nextra-compat";
import { type Page } from "nextra";
import Link from 'next/link';
import { useState, useMemo } from 'react';

interface TutorialCardProps {
  href: string;
  title: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
}

const TutorialCard = ({ href, title, thumbnail, description, tags }: TutorialCardProps) => (
  <Link href={href} className="group h-full">
    <div className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 hover:border-red-500 transition-colors">
      <div className="h-36 flex-shrink-0">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full">
            <img
              src="/images/tutorials/default.png"
              alt="thumbnail"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-4 ">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-red-600 transition-colors">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{description}</p>
        )}
        {/* {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )} */}
      </div>
    </div>
  </Link>
);

export const TutorialIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const pages = getPagesUnderRoute("/guides/tutorials") as Array<
    Page & { frontMatter: any }
  >;

  const filteredPages = pages.filter((page) => page.route !== "/tutorials");
  const categoryOrder = ["Beginner", "Intermediate", "Advanced", "Other"];

  // Group pages by category
  const categorizedPages = useMemo(() => {
    const grouped = filteredPages.reduce((acc, page) => {
      const category = page.frontMatter?.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(page);
      return acc;
    }, {} as Record<string, Array<Page & { frontMatter: any }>>);

    // Ensure all categories exist
    categoryOrder.forEach(category => {
      if (!grouped[category]) {
        grouped[category] = [];
      }
    });

    return grouped;
  }, [filteredPages]);

  // Filter pages based on search query and category
  const filteredCategories = useMemo(() => {
    return categoryOrder.reduce((acc, category) => {
      const categoryPages = categorizedPages[category] || [];
      
      const filtered = categoryPages.filter(page => {
        const matchesSearch = searchQuery.toLowerCase() === '' || 
          page.frontMatter?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.frontMatter?.description?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !selectedCategory || category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      });

      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      
      return acc;
    }, {} as Record<string, Array<Page & { frontMatter: any }>>);
  }, [categorizedPages, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Filter UI */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 
              focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-900"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 
              focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-900"
          >
            <option value="">All Categories</option>
            {categoryOrder.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const categoryPages = filteredCategories[category] || [];
          
          if (categoryPages.length === 0) return null;
          
          return (
            <div key={category}>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                {categoryPages
                  .sort((a, b) => (a.frontMatter?.order ?? Infinity) - (b.frontMatter?.order ?? Infinity))
                  .map((page) => (
                    <TutorialCard
                      key={page.route}
                      href={page.route}
                      title={
                        page.frontMatter?.title ||
                        page.name
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")
                      }
                      thumbnail={page.frontMatter?.thumbnail}
                      description={page.frontMatter?.description}
                      tags={page.frontMatter?.tags || []}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};