import { NextApiRequest, NextApiResponse } from "next";
import { GitHubContributor, ContributorsResponse } from "@/types/contributors";
import { GITHUB_REPO_API_BASE } from "@/lib/constants";

interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  } | null;
  committer: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  } | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContributorsResponse>
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        contributors: [],
        error: "Method Not Allowed"
      });
    }

    const { path } = req.query;

    if (!path || typeof path !== 'string') {
      return res.status(400).json({
        contributors: [],
        error: "Missing required parameter: path"
      });
    }

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "lamatic-docs",
    };

    if (process.env.GITHUB_ACCESS_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
    }

    // Helper to fetch with per-request timeout
    const fetchWithTimeout = async (url: string, headers: Record<string, string>, ms = 15000) => {
      const controller = new AbortController();
      const to = setTimeout(() => controller.abort(), ms);
      try {
        const res = await fetch(url, { headers, signal: controller.signal });
        return res;
      } finally {
        clearTimeout(to);
      }
    }

    try {
      const allCommits: GitHubCommit[] = [];
      let nextUrl: string | null = `${GITHUB_REPO_API_BASE}/commits?path=${encodeURIComponent(path)}&per_page=100`;

      while (nextUrl) {
        const response = await fetchWithTimeout(nextUrl, headers, 15000);

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          } else if (response.status === 404) {
            throw new Error("File not found or access denied.");
          } else {
            throw new Error(`GitHub API responded with status: ${response.status}`);
          }
        }

        const pageCommits: GitHubCommit[] = await response.json();
        allCommits.push(...pageCommits);

        const linkHeader = response.headers.get('link');
        if (linkHeader) {
          const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
          nextUrl = nextMatch ? nextMatch[1] : null;
        } else {
          nextUrl = null;
        }
      }
      // Aggregate commits by author
      const contributorMap = new Map<string, GitHubContributor>();

      for (const commit of allCommits) {
        const user = commit.author || commit.committer;
        if (user) {
          if (!contributorMap.has(user.login)) {
            contributorMap.set(user.login, {
              login: user.login,
              id: user.id,
              avatar_url: user.avatar_url,
              html_url: user.html_url,
              contributions: 0,
            });
          }
          contributorMap.get(user.login)!.contributions += 1;
        }
      }

      const contributors = Array.from(contributorMap.values()).sort(
        (a, b) => b.contributions - a.contributions
      );

      return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600")
      .json({ contributors: contributors });
    } catch (error: unknown) {
      if ((error as any)?.name === 'AbortError') {
        return res.status(504).json({
          contributors: [],
          error: "Request timeout while fetching contributors"
        });
      }
      console.error("Error fetching contributors:", error);
      return res.status(500).json({
        contributors: [],
        error: error instanceof Error ? error.message : "Internal Server Error"
      });
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return res.status(500).json({
      contributors: [],
      error: error instanceof Error ? error.message : "Internal Server Error"
    });
  }
}
