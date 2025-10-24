import { NextApiRequest, NextApiResponse } from "next";
import { GitHubContributor, ContributorsResponse } from "@/types/contributors";
import { GITHUB_REPO_API_URL } from "@/lib/constants";

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

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "lamatic-docs",
    };

    if (process.env.GITHUB_ACCESS_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s

    try {
      const allContributors: GitHubContributor[] = [];
      let nextUrl = `${GITHUB_REPO_API_URL}?per_page=100`;

      while (nextUrl) {
        const response = await fetch(nextUrl, {
          headers,
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.");
          } else if (response.status === 404) {
            throw new Error("Repository not found or access denied.");
          } else {
            throw new Error(`GitHub API responded with status: ${response.status}`);
          }
        }

        const pageContributors: GitHubContributor[] = await response.json();
        allContributors.push(...pageContributors);

        // Check for next page in Link header
        const linkHeader = response.headers.get('link');
        if (linkHeader) {
          const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
          nextUrl = nextMatch ? nextMatch[1] : null;
        } else {
          nextUrl = null;
        }
      }

      const contributors = allContributors;

      return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      // Cache the response for 1 hour, also CDNs as public
      .setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600")
      .json({ contributors: contributors });
    } catch (error) {
      if (error.name === 'AbortError') {
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
