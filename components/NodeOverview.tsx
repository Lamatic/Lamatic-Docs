import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import {
  Check,
  AlertTriangle,
  Download,
  Code,
  Bug,
  ArrowRight,
  CheckCircle,
  Settings2,
  Info,
  FileOutput
} from "lucide-react";

// Get Node page data by slug (example: /pages/docs/nodes/api-node)

interface NodeCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: string;
}

// Show Icon based on the title
// If title is Overview, show info
// If title is Features, show a checkmark
// If title is Prerequisites, show a warning
// If title is Installation, show a download
// If title is Configuration, show a settings
// If title is Usage Examples, show a code
// If title is Troubleshooting, show a bug
// If title is API Reference, show a code
const IntegrationIcon = ({ title }: { title: string }) => {
  switch (title) {
    case "Overview":
      return <Info className="w-5 h-5" />;
    case "Features":
      return <CheckCircle className="w-5 h-5" />;
    case "Prerequisites":
      return <AlertTriangle className="w-5 h-5" />;
    case "Installation":
      return <Download className="w-5 h-5" />;
    case "Configuration":
      return <Settings2 className="w-5 h-5" />;
    case "Configuration Reference":
      return <Settings2 className="w-5 h-5" />;
    case "Usage Examples":
      return <Code className="w-5 h-5" />;
    case "Troubleshooting":
      return <Bug className="w-5 h-5" />;
    case "API Reference":
      return <Code className="w-5 h-5" />;
    case "Output":
      return <FileOutput className="w-5 h-5" />;
    case "Low-Code Example":
        return <Code className="w-5 h-5" />;
    case "Low-Code Examples":
            return <Code className="w-5 h-5" />;
    case "Webhooks":
        return <Code className="w-5 h-5" />;
    case "Rate Limits":
        return <Code className="w-5 h-5" />;
    case "Security":
        return <Code className="w-5 h-5" />;
    default:
      return <Check className="w-5 h-5" />;
  }
};

const NodeCard = ({
  href,
  title,
  description,
  icon,
}: NodeCardProps) => {
  return (
    <Link
      href={href}
      className="group block p-3 bg-white dark:bg-stone-950 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md duration-200 hover:border-red-300 dark:hover:border-red-600 transition-all"
    >
      <div className="flex items-start space-x-1">
        {/* {icon && (
          <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <span className="text-red-600 dark:text-red-400 text-md font-semibold">
              <IntegrationIcon title={title} />
            </span>
          </div>
        )} */}
        <div className="flex-1 min-w-0">
          <IntegrationIcon title={title} />
          <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-1">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors">
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
};

interface NodeOverviewProps {
  slug?: string;
}

export const NodeOverview = ({ slug }: NodeOverviewProps) => {
  const [headings, setHeadings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pages = getPagesUnderRoute("/docs/nodes") as Array<
    Page & { frontMatter: any }
  >;

  const currentPage = useMemo(() => {
    if (!slug) return null;
    return pages.find((page) => page.name === slug);
  }, [pages, slug]);

  // Fetch headings from API
  useEffect(() => {
    if (!slug) {
      setHeadings([]);
      return;
    }

    const fetchHeadings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/node-headings?slug=${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Node not found');
          } else {
            setError('Failed to load node sections');
          }
          setHeadings([]);
          return;
        }

        const data = await response.json();
        setHeadings(data.headings || []);
      } catch (err) {
        console.error('Error fetching headings:', err);
        setError('Failed to load node sections');
        setHeadings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadings();
  }, [slug]);

  if (!slug || !currentPage) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          Node not found
        </div>
        <div className="text-gray-400 dark:text-gray-500 text-sm">
          Please provide a valid node slug
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          Loading node sections...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          {error}
        </div>
        <div className="text-gray-400 dark:text-gray-500 text-sm">
          Please try again later
        </div>
      </div>
    );
  }

  if (headings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          No sections found for this node
        </div>
        <div className="text-gray-400 dark:text-gray-500 text-sm">
          The node documentation may not have the expected structure
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0 mb-10 mt-6">
      {/* <h2 className="text-2xl font-bold mb-n10">Overview</h2> */}
      {/* Node Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {headings.map((heading) => {
          // Generate anchor link for the heading
          const anchor = heading
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "");
          const href = `${currentPage.route}#${anchor}`;

          // Generate description based on heading
          const description = getHeadingDescription(heading);

          // Generate icon from heading
          const icon = heading.split(" ")[0].charAt(0).toUpperCase();

          return (
            <NodeCard
              key={heading}
              href={href}
              title={heading}
              description={description}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
};

// Helper function to generate descriptions for headings
function getHeadingDescription(heading: string): string {
  const descriptions: Record<string, string> = {
    Features: "Explore the key features and capabilities of this node.",
    Prerequisites:
      "Learn about the requirements and setup needed before using this node.",
    Installation:
      "Step-by-step guide to install and configure this node.",
    Configuration:
      "Detailed configuration options and settings for this node.",
    "Configuration Reference":
      "Complete reference guide for all configuration parameters.",
    "Usage Examples": "Practical examples and use cases for this node.",
    Troubleshooting: "Common issues and solutions for this node.",
    "API Reference": "Complete API documentation and endpoint references.",
    Authentication: "Authentication methods and credential setup.",
    Webhooks: "Webhook configuration and event handling.",
    "Rate Limits": "Rate limiting information and best practices.",
    Security: "Security considerations and best practices.",
    Overview: "Get an overview of this node and its capabilities.",
  };

  return (
    descriptions[heading] ||
    `Learn more about ${heading.toLowerCase()} for this node.`
  );
}
