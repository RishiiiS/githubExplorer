import React from 'react';
import RepoItem from './RepoItem';
import './RepoList.css';

export default function RepoList({ repos, isLoading, error, showOwner = false }) {
  if (error) {
    return (
      <div className="repo-list-state error-state">
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="repo-grid">
        <div className="skeleton-row" style={{ height: '140px' }}></div>
        <div className="skeleton-row" style={{ height: '140px' }}></div>
        <div className="skeleton-row" style={{ height: '140px' }}></div>
        <div className="skeleton-row" style={{ height: '140px' }}></div>
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className="repo-list-state empty-state">
        <p>No repositories found.</p>
      </div>
    );
  }

  return (
    <div className="repo-grid">
      {repos.map(repo => (
        <RepoItem key={repo.id} repo={repo} showOwner={showOwner} />
      ))}
    </div>
  );
}
