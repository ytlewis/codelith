import { useState, useEffect } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

const GITHUB_USERNAME = 'ytlewis';

/** Validate and sanitise a single repo object from the API response */
function parseRepo(raw: unknown): GitHubRepo | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;

  const id = typeof r.id === 'number' ? r.id : null;
  const name = typeof r.name === 'string' ? r.name.slice(0, 100) : null;
  const html_url = typeof r.html_url === 'string' && r.html_url.startsWith('https://github.com/')
    ? r.html_url : null;

  if (!id || !name || !html_url) return null;

  // homepage: only allow http/https URLs
  let homepage: string | null = null;
  if (typeof r.homepage === 'string' && /^https?:\/\//.test(r.homepage)) {
    homepage = r.homepage.slice(0, 200);
  }

  const topics = Array.isArray(r.topics)
    ? (r.topics as unknown[])
        .filter((t): t is string => typeof t === 'string')
        .map((t) => t.slice(0, 50))
        .slice(0, 10)
    : [];

  return {
    id,
    name,
    description: typeof r.description === 'string' ? r.description.slice(0, 300) : null,
    html_url,
    homepage,
    topics,
    language: typeof r.language === 'string' ? r.language.slice(0, 50) : null,
    stargazers_count: typeof r.stargazers_count === 'number' ? r.stargazers_count : 0,
    forks_count: typeof r.forks_count === 'number' ? r.forks_count : 0,
    updated_at: typeof r.updated_at === 'string' ? r.updated_at : '',
    fork: r.fork === true,
  };
}

export function useGitHubRepos(limit = 30) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${Math.min(limit, 100)}&type=owner`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
      }
    )
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API returned ${r.status}`);
        return r.json();
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) throw new Error('Unexpected API response shape');
        const parsed = (data as unknown[])
          .map(parseRepo)
          .filter((r): r is GitHubRepo => r !== null && !r.fork);
        setRepos(parsed);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (e.name === 'AbortError') return;
        setError('Could not load repositories. Please try again later.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [limit]);

  return { repos, loading, error };
}
