import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/router';
import { GitHubContributor, ContributorsResponse } from '@/types/contributors';
import { urlPathToGitHubPath } from '@/lib/utils';

export const PageContributors: React.FC = () => {
  const router = useRouter();
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContributors = async () => {
      try {
        // Convert URL path to GitHub file path
        const githubPath = urlPathToGitHubPath(router.asPath);

        // Fetch contributors for this specific file
        const response = await fetch(
          `/api/contributors-per-page?path=${encodeURIComponent(githubPath)}`
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
        console.error('Error fetching page contributors:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contributors');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContributors();
  }, [router.asPath]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-2 text-sm w-full pt-2">
        <div className="flex items-center gap-2 font-semibold">
          <Users className="w-4 h-4" />
          <span>Contributors</span>
        </div>
        <div className="flex justify-center py-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || contributors.length === 0) {
    // Don't show anything if there's an error or no contributors
    return null;
  }

  // Show top 6 contributors in a compact format
  const visibleContributors = contributors.slice(0, 6);

  return (
    <div className="flex flex-col space-y-2 text-sm w-full pt-2">
      <div className="flex items-center gap-2 font-semibold">
        <Users className="w-4 h-4 flex-shrink-0" />
        <span>Contributors</span>
      </div>

      <div className="flex flex-col space-y-2">
        {visibleContributors.map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group hover:bg-accent/50 p-1 rounded transition-colors min-w-0"
          >
            <Avatar className="w-6 h-6 flex-shrink-0">
              <AvatarImage
                src={contributor.avatar_url}
                alt={`${contributor.login}'s avatar`}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {contributor.login.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs flex-1 truncate min-w-0">{contributor.login}</span>
            <Badge variant="secondary" className="text-xs flex-shrink-0 whitespace-nowrap">
              {`${contributor.contributions} ${contributor.contributions === 1 ? 'commit' : 'commits'}`}
            </Badge>
            <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}

        {contributors.length > 6 && (
          <div className="text-xs text-muted-foreground pt-1">
            +{contributors.length - 6} more
          </div>
        )}
      </div>
    </div>
  );
};

export default PageContributors;
