import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export const AppsDataSourcesTable = () => {
  // Get all pages under /integrations/apps-data-sources
  const allPages = getPagesUnderRoute("/integrations/apps-data-sources");
  const pages = flattenPages(allPages).filter(
    (page) => 
      page.route !== "/integrations/apps-data-sources" && 
      page.route !== "/pages/integrations/apps-data-sources" &&
      page.route.includes("/integrations/apps-data-sources/")
  );

  // Sort pages by title
  const sortedPages = pages.sort((a, b) => {
    const titleA = a.frontMatter?.title || a.name;
    const titleB = b.frontMatter?.title || b.name;
    return titleA.localeCompare(titleB);
  });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-20">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPages.map((page) => {
              const title = page.frontMatter?.title || 
                page.name
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
              const description = page.frontMatter?.description || "No description available";
              const icon = page.frontMatter?.icon || null;
              
              return (
                <TableRow key={page.route} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell className="w-12">
                    {icon ? (
                      <img 
                        src={icon} 
                        alt={title} 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-black dark:text-white">
                    {title}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-300 max-w-md">
                    {description}
                  </TableCell>
                  <TableCell className="w-20">
                    <Link
                      href={page.route}
                      className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors text-sm"
                    >
                      View
                      <ExternalLinkIcon className="w-3 h-3" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {sortedPages.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No app data sources found.
        </div>
      )}
    </div>
  );
};

export default AppsDataSourcesTable; 