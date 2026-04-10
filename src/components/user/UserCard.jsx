import React from 'react';
import { Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UserCard.css';

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <img src={user.avatar_url} alt={user.login} className="user-card-avatar" />
        <div className="user-card-info">
          <h3 className="user-card-name">{user.login}</h3>
          <p className="user-card-login">@{user.login}</p>
        </div>
      </div>

      <div className="user-card-action">
        <Link to={`/user/${user.login}`} className="view-profile-btn">
          View Repositories
        </Link>
      </div>
    </div>
  );
}
