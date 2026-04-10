import React from 'react';
import RepoItem from './RepoItem';

export default function RepoList({ repos, isLoading, error }) {
  if (error) {
    return (
      <div className="repo-list-state error-state">
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="repo-list-state loading-state">
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
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
    <div className="repo-list">
      {repos.map(repo => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
