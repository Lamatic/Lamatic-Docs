import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import Link from 'next/link';

export const NodesIndex = () => {
  // Get and process pages
  const pages = (getPagesUnderRoute("/docs/nodes") as Array<Page & { frontMatter: any }>)
    .filter((page) => page.route !== "/nodes");

  // Sort all pages by type first, then by order within each type
  const sortedPages = pages.sort((a, b) => {
    const typeA = a.frontMatter?.type || "Other";
    const typeB = b.frontMatter?.type || "Other";
    if (typeA !== typeB) return typeA.localeCompare(typeB);
    
    const orderA = a.frontMatter?.order ?? Infinity;
    const orderB = b.frontMatter?.order ?? Infinity;
    return orderA - orderB;
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-4 text-left border border-gray-200 dark:border-gray-700">Category</th>
            <th className="p-4 text-left border border-gray-200 dark:border-gray-700">Name</th>
            <th className="p-4 text-left border border-gray-200 dark:border-gray-700">Description</th>
            <th className="p-4 text-left border border-gray-200 dark:border-gray-700">Link</th>
          </tr>
        </thead>
        <tbody>
          {sortedPages.map((page) => {
            const title = page.frontMatter?.title || 
              page.name
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            return (
              <tr key={page.route} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  {page.frontMatter?.type || "Other"}
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  {title}
                </td>
                
                
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  {page.frontMatter?.description || "No description available"}
                </td>
                <td className="p-4 border border-gray-200 dark:border-gray-700">
                  <Link 
                    href={page.route}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NodesIndex;