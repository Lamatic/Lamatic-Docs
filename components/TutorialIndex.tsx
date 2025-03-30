import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import Link from 'next/link';

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
  const pages = getPagesUnderRoute("/guides/tutorials") as Array<
    Page & { frontMatter: any }
  >;

  const filteredPages = pages.filter((page) => page.route !== "/tutorials");

  // Define the order of categories
  const categoryOrder = ["Beginner", "Intermediate", "Advanced", "Other"];
  
  // Group pages by category
  const categorizedPages = filteredPages.reduce((acc, page) => {
    const category = page.frontMatter?.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(page);
    return acc;
  }, {} as Record<string, Array<Page & { frontMatter: any }>>);

  // Ensure all categories exist in the object
  categoryOrder.forEach(category => {
    if (!categorizedPages[category]) {
      categorizedPages[category] = [];
    }
  });

  return (
    <div className="space-y-12">
      {categoryOrder.map((category) => {
        const categoryPages = categorizedPages[category] || [];
        
        // Skip rendering empty categories
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
  );
};