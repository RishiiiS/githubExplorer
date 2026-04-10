import React from 'react';
import { Users, MapPin, Link as LinkIcon, AtSign } from 'lucide-react';
import './UserProfileSidebar.css';

export default function UserProfileSidebar({ userProfile, isLoading }) {
  if (isLoading || !userProfile) {
    return (
      <aside className="user-profile-sidebar">
        <div className="repo-list-state loading-state">
          <div className="skeleton-row" style={{ height: '280px', borderRadius: '50%' }}></div>
          <div className="skeleton-row" style={{ height: '32px' }}></div>
          <div className="skeleton-row" style={{ height: '20px' }}></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="user-profile-sidebar">
      <img 
        src={userProfile.avatar_url} 
        alt={`${userProfile.login} avatar`} 
        className="user-avatar-large"
      />
      <div className="user-header-info">
        <h1 className="user-name">{userProfile.name || userProfile.login}</h1>
        <h2 className="user-login">{userProfile.login}</h2>
      </div>

      {userProfile.bio && (
        <p className="user-bio">{userProfile.bio}</p>
      )}

      <div className="user-stats">
        <Users size={14} className="stat-icon" />
        <span className="stat-bold">{userProfile.followers}</span> followers
        <span className="stat-dot">·</span>
        <span className="stat-bold">{userProfile.following}</span> following
      </div>

      <div className="user-details">
        {userProfile.location && (
          <div className="detail-item">
            <MapPin size={16} /> <span>{userProfile.location}</span>
          </div>
        )}
        {userProfile.blog && (
          <div className="detail-item">
            <LinkIcon size={16} /> <a href={userProfile.blog.startsWith('http') ? userProfile.blog : `https://${userProfile.blog}`} target="_blank" rel="noreferrer">{userProfile.blog}</a>
          </div>
        )}
        {userProfile.twitter_username && (
          <div className="detail-item">
            <AtSign size={16} /> <span>@{userProfile.twitter_username}</span>
          </div>
        )}
      </div>
    </aside>
  );
}
