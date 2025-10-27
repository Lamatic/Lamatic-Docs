import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a URL path to a GitHub file path
 * Examples:
 *   /docs/agents/getting-started -> pages/docs/agents/getting-started.mdx
 *   /guides/getting-started -> pages/guides/getting-started.mdx
 *   / -> pages/index.mdx
 */
export function urlPathToGitHubPath(urlPath: string): string {
  // Remove leading slash
  const path = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;

  // Handle root path
  if (!path || path === '') {
    return 'pages/index.mdx';
  }

  // Check if path has a trailing slash (directory index)
  const isDirectory = path.endsWith('/');
  const normalizedPath = isDirectory ? path.slice(0, -1) : path;

  // If path ends with '.mdx' or '.md', use as-is
  if (normalizedPath.endsWith('.mdx') || normalizedPath.endsWith('.md')) {
    return `pages/${normalizedPath}`;
  }

  // For paths with trailing slash, use index.mdx
  if (isDirectory) {
    return `pages/${normalizedPath}/index.mdx`;
  }

  // Special case: known directories that should map to index.mdx
  const knownDirectories = ['docs', 'guides', 'integrations', 'templates'];
  if (knownDirectories.includes(normalizedPath)) {
    return `pages/${normalizedPath}/index.mdx`;
  }

  // For other paths without trailing slash, try direct .mdx mapping
  return `pages/${normalizedPath}.mdx`;
}

/**
 * Converts a GitHub file path to a URL path
 * Examples:
 *   pages/docs/agents/getting-started.mdx -> /docs/agents/getting-started
 *   pages/guides/getting-started.mdx -> /guides/getting-started
 *   pages/index.mdx -> /
 */
export function githubPathToUrlPath(githubPath: string): string {
  // Remove 'pages/' prefix
  let path = githubPath.startsWith('pages/') ? githubPath.slice(6) : githubPath;

  // Remove .mdx or .md extension
  path = path.replace(/\.(mdx|md)$/, '');

  // Handle index
  if (path === 'index') {
    return '/';
  }

  return `/${path}`;
}
