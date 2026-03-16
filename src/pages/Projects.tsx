import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Star, GitFork, Code2, Loader2, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import PageBackground from '@/components/PageBackground';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';

gsap.registerPlugin(ScrollTrigger);

function RepoCard({ repo, index }: { repo: import('@/hooks/useGitHubRepos').GitHubRepo; index: number }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card group relative overflow-hidden rounded-xl border border-border bg-card p-6
                 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-primary">
          <Code2 className="w-4 h-4 shrink-0" />
          <span className="font-heading font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
            {repo.name}
          </span>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 5).map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
        </span>
        <span className="ml-auto">
          {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>
    </a>
  );
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos(30);

  useEffect(() => {
    if (!loading && repos.length > 0) {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' } }
      );
    }
  }, [loading, repos]);

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Open-source work and experiments from{' '}
              <a href="https://github.com/ytlewis" target="_blank" rel="noopener noreferrer"
                className="text-primary hover:underline">
                @ytlewis
              </a>{' '}
              on GitHub
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-sm">Fetching repositories…</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && (
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
