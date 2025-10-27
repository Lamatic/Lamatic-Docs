export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface ContributorsResponse {
  contributors: GitHubContributor[];
  error?: string;
}
