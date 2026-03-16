import { Link } from 'react-router-dom';
import { Star, GitFork, ArrowRight, Loader2 } from 'lucide-react';
import SplitText from './SplitText';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';

export default function PortfolioSection() {
  const { repos, loading } = useGitHubRepos(10);

  // pick top 3 by stars, fallback to most recent
  const featured = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-6xl mx-auto w-full">
        <SplitText as="h2"
          className="text-3xl md:text-5xl font-heading font-bold text-foreground text-center mb-16">
          SELECTED WORK
        </SplitText>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((repo, i) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="card-service group">
                <div className="aspect-video rounded-md bg-secondary mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-heading font-bold text-muted-foreground/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                {repo.language && (
                  <span className="text-xs uppercase tracking-widest text-primary font-heading">
                    {repo.language}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                  {repo.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5"/> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5"/> {repo.forks_count}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40
                       text-primary hover:bg-primary/10 transition-all duration-200 text-sm font-semibold">
            View all projects <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
      </div>
    </section>
  );
}
