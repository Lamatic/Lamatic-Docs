import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import { FileCode } from "lucide-react";
import Link from 'next/link';

interface TutorialCardProps {
  href: string;
  title: string;
  thumbnail?: string;
  description?: string;
}

const TutorialCard = ({ href, title, thumbnail, description }: TutorialCardProps) => (
  <Link href={href} className="group">
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 hover:border-red-500 transition-colors">
      <div className="h-36 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            {/* <FileCode className="w-12 h-12 text-gray-400" /> */}
            <img
            src="/images/tutorials/default.png"
            alt={`thumbnail`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  </Link>
);

export const TutorialIndex = () => {
  const pages = getPagesUnderRoute("/guides/tutorials") as Array<
    Page & { frontMatter: any }
  >;

  // Filter out the tutorials page itself
  const filteredPages = pages.filter((page) => page.route !== "/tutorials");

  // Separate beginner tutorials and other categories
  const beginnerPages = filteredPages.filter(
    (page) => page.frontMatter?.category === "Beginner"
  ).sort((a, b) => (a.frontMatter?.order ?? Infinity) - (b.frontMatter?.order ?? Infinity));

  // Group other tutorials by category
  const otherCategories = filteredPages
    .filter((page) => page.frontMatter?.category !== "Beginner")
    .reduce((acc, page) => {
      const category = page.frontMatter?.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(page);
      return acc;
    }, {} as Record<string, Array<Page & { frontMatter: any }>>);

  return (
    <div className="space-y-12">
      {/* Beginner Tutorials */}
      {beginnerPages.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Beginner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerPages.map((page) => (
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
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Categories */}
      {Object.entries(otherCategories)
        .sort(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB))
        .map(([category, categoryPages]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};