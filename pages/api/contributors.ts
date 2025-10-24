import { NextApiRequest, NextApiResponse } from "next";

interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface ContributorsResponse {
  contributors: GitHubContributor[];
  error?: string;
}

const GITHUB_REPO_API_URL = "https://api.github.com/repos/lamatic/lamatic-docs/contributors";

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

    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "lamatic-docs",
    };

    if (process.env.GITHUB_ACCESS_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_ACCESS_TOKEN}`;
    }

    const response = await fetch(GITHUB_REPO_API_URL, { headers });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
      } else if (response.status === 404) {
        throw new Error("Repository not found or access denied.");
      } else {
        throw new Error(`GitHub API responded with status: ${response.status}`);
      }
    }

    const contributors: GitHubContributor[] = await response.json();

    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      // Cache the response for 1 hour, also CDNs as public
      .setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600")
      .setHeader("ETag", `"contributors-${Date.now()}"`)
      .json({ contributors: contributors });
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return res.status(500).json({
      contributors: [],
      error: error instanceof Error ? error.message : "Internal Server Error"
    });
  }
}
