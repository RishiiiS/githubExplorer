import React from 'react';
import { Star, GitFork } from 'lucide-react';
import './RepoItem.css';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Rust: '#dea584',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

export default function RepoItem({ repo }) {
  const langColor = languageColors[repo.language] || '#8b949e';

  return (
    <div className="repo-item">
      <div className="repo-main">
        <a 
          href={repo.html_url} 
          className="repo-name" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {repo.name}
        </a>
        <span className="repo-badge">{repo.private ? 'Private' : 'Public'}</span>
      </div>
      
      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

      <div className="repo-metadata">
        {repo.language && (
          <div className="meta-item language">
            <span className="lang-dot" style={{ backgroundColor: langColor }}></span>
            <span>{repo.language}</span>
          </div>
        )}
        
        {repo.stargazers_count > 0 && (
          <div className="meta-item">
            <Star size={14} className="meta-icon" />
            <span>{repo.stargazers_count}</span>
          </div>
        )}

        {repo.forks_count > 0 && (
          <div className="meta-item">
            <GitFork size={14} className="meta-icon" />
            <span>{repo.forks_count}</span>
          </div>
        )}
      </div>
    </div>
  );
}
