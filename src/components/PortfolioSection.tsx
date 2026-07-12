import { Link } from 'react-router-dom';
import { Star, GitFork, ArrowRight, Loader2 } from 'lucide-react';
import SplitText from './SplitText';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';

export default function PortfolioSection() {
  const { repos, loading } = useGitHubRepos(10);
  const featured = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <section className="section-full relative z-10 py-20">
      <div className="px-6 max-w-7xl mx-auto w-full">
        <SplitText as="h2"
          className="text-3xl md:text-5xl font-heading font-bold text-foreground text-left mb-16 lowercase">
          selected work
        </SplitText>

        {loading && (
          <div className="flex justify-start py-16">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
          </div>
        )}

        {!loading && (
          <div className="relative">
            {featured.map((repo, index) => (
              <div
                key={repo.id}
                className="mb-8"
                style={{
                  marginLeft: `${index % 3 === 0 ? '0' : index % 3 === 1 ? '10%' : '20%'}`,
                  maxWidth: index % 3 === 0 ? '75%' : index % 3 === 1 ? '65%' : '55%',
                }}
              >
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:bg-card/90">
                    <div className="aspect-video bg-gradient-to-br from-secondary to-secondary/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                      <div className="absolute top-4 left-4 font-heading text-4xl font-bold text-muted-foreground/20">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                          view project <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      {repo.language && (
                        <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest bg-primary/10 text-primary rounded-full mb-3">
                          {repo.language}
                        </span>
                      )}
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors lowercase">
                        {repo.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed lowercase">
                        {repo.description || 'no description provided.'}
                      </p>
                      
                      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <GitFork className="w-4 h-4" />
                          <span className="font-medium">{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-start mt-12">
          <Link to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                       bg-gradient-to-r from-primary to-accent text-white
                       hover:from-primary/90 hover:to-accent/90 transition-all duration-300
                       text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 lowercase">
            view all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
