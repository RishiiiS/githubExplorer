import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import UserCard from '../components/user/UserCard';
import { searchUsers } from '../services/github';
import { useDebounce } from '../hooks/useDebounce';
import './SearchResults.css';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setUsers([]);
      return;
    }

    navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`, { replace: true });

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchUsers(debouncedQuery);
        setUsers(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, navigate]);

  return (
    <div className="search-results-page">
      <div className="search-bar-inline">
        <Search className="search-icon-inline" size={18} />
        <input 
          type="text" 
          className="search-input-inline" 
          placeholder="Refine search..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="search-results-header">
        <h2 className="search-results-title">
          {isLoading ? 'Searching...' : `${users.length} developers for `}
          <span className="query-highlight">"{debouncedQuery}"</span>
        </h2>
      </div>

      {isLoading && (
        <div className="repo-list-state loading-state">
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      )}

      {error && (
        <div className="repo-list-state error-state">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && users.length === 0 && debouncedQuery && (
        <div className="repo-list-state empty-state">
          <p>We couldn't find any users matching '{debouncedQuery}'.</p>
        </div>
      )}

      {!isLoading && !error && users.length > 0 && (
        <div className="search-results-grid">
          {users.map(user => (
            <UserCard key={user.login} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
