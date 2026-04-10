import React, { useState, useEffect } from 'react';
import { Star, GitFork, Bookmark } from 'lucide-react';
import { isBookmarked, toggleBookmark } from '../../utils/bookmarks';
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

export default function RepoItem({ repo, showOwner }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(repo.id));
  }, [repo.id]);

  const handleBookmark = (e) => {
    e.preventDefault();
    const newState = toggleBookmark(repo);
    setBookmarked(newState);
  };

  const langColor = languageColors[repo.language] || '#8b949e';

  return (
    <div className="repo-item">
      <div className="repo-main">
        <a 
          href={repo.html_url} 
          className="repo-name" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {showOwner && repo.full_name ? (
            <>
              <img 
                src={repo.owner?.avatar_url || `https://github.com/${repo.full_name.split('/')[0]}.png`} 
                alt={repo.owner?.login || repo.full_name.split('/')[0]} 
                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
              />
              <span>
                <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>{repo.full_name.split('/')[0]} / </span>
                {repo.name}
              </span>
            </>
          ) : (
            repo.name
          )}
        </a>
        <div className="repo-header-actions">
          <span className="repo-badge">{repo.private ? 'Private' : 'Public'}</span>
          <button 
            className="bookmark-btn" 
            onClick={handleBookmark} 
            title={bookmarked ? "Remove bookmark" : "Bookmark repository"}
            aria-label="Toggle Bookmark"
          >
            <Bookmark 
              size={18} 
              fill={bookmarked ? 'currentColor' : 'none'} 
              color={bookmarked ? 'var(--accent-color)' : 'var(--text-muted)'} 
            />
          </button>
        </div>
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
