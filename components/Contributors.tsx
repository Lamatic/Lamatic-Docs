import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Users } from 'lucide-react';
import Link from 'next/link';
import { GitHubContributor, ContributorsResponse } from '@/types/contributors';
import { GITHUB_REPO_URL } from '@/lib/constants';

export const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('/api/contributors');
        if (!response.ok) {
          throw new Error('Failed to fetch contributors');
        }
        const data: ContributorsResponse = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setContributors(data.contributors);
      } catch (err) {
        console.error('Error fetching contributors:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contributors');
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Documentation Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Documentation Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Unable to load contributors at this time.</p>
            <p className="text-sm mt-2">Error: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (contributors.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Documentation Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No contributors found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Documentation Contributors
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Thanks to our amazing community contributors who help improve our documentation!
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {contributors.map((contributor) => (
            <Link
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-3 rounded-lg border border-border/50 hover:border-border hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
            >
              <div className="relative">
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarImage
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    className="group-hover:scale-105 transition-transform duration-200"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {contributor.login.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1">
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 truncate max-w-[80px]">
                  {contributor.login}
                </p>
                {/* <Badge variant="secondary" className="text-xs mt-1">
                  {`${contributor.contributions} ${contributor.contributions === 1 ? 'commit' : 'commits'}`}
                </Badge> */}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Github className="w-4 h-4" />
            <span>
              Want to contribute?
              <Link
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                Join us on GitHub
              </Link>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contributors;
