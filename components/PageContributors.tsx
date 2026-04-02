import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { useRouter } from 'next/router';
import { GitHubContributor, ContributorsResponse } from '@/types/contributors';
import { urlPathToGitHubPath } from '@/lib/utils';

export const PageContributors: React.FC = () => {
  const router = useRouter();
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPageContributors = async () => {
      try {
        // Convert URL path to GitHub file path (strip query/hash just in case)
        const cleanPath = router.asPath.split(/[?#]/)[0];
        const githubPath = urlPathToGitHubPath(cleanPath);

        // Fetch contributors for this specific file
        const response = await fetch(
          `/api/contributors-per-page?path=${encodeURIComponent(githubPath)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }

        const data: ContributorsResponse = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setContributors(data.contributors);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error('Error fetching page contributors:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contributors');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContributors();
    return () => controller.abort();
  }, [router.asPath]);

  if (loading) {
    return (
      <div className="w-full pt-2">
        <div className="grid grid-cols-4 gap-2 pb-1">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-7 w-7 rounded-full bg-muted/60 animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || contributors.length === 0) {
    // Don't show anything if there's an error or no contributors
    return null;
  }

  // Keep this compact to avoid distracting from docs content.
  const visibleContributors = contributors.slice(0, 10);

  return (
    <div className="w-full pt-2">
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Users className="h-4 w-4 flex-shrink-0" />
        <span>Contributors</span>
      </div>
      <div className="grid grid-cols-4 gap-1 pb-1 overflow-visible">
        {visibleContributors.map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contributor.login}
            className="group relative shrink-0 rounded-full overflow-visible !opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Avatar className="w-10 h-10 ring-1 ring-border/40 hover:ring-primary/30 transition-colors">
              <AvatarImage
                src={contributor.avatar_url}
                alt={`${contributor.login}'s avatar`}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {contributor.login.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-[999] mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[11px] font-medium text-popover-foreground group-hover:block group-focus-visible:block"
            >
              {contributor.login}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PageContributors;
