import React, { useState, useEffect } from 'react';
import RepoList from '../components/repo/RepoList';
import { getBookmarks } from '../utils/bookmarks';
import { Bookmark } from 'lucide-react';
import './Bookmarks.css';

export default function Bookmarks() {
  const [bookmarkedRepos, setBookmarkedRepos] = useState([]);

  // Fetch bookmarks on mount. 
  // We can also poll localStorage if we want multi-tab sync, but standard mount is fine for simple SPA
  useEffect(() => {
    setBookmarkedRepos(getBookmarks());
    
    // Optional: listen to storage events to auto-update if un-bookmarked from another tab
    const handleStorage = () => {
      setBookmarkedRepos(getBookmarks());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <Bookmark size={28} className="bookmarks-icon" />
        <h1>Your Saved Repositories</h1>
      </div>
      
      {bookmarkedRepos.length === 0 ? (
        <div className="empty-bookmarks">
          <p>You haven't bookmarked any repositories yet.</p>
          <a href="/" className="explore-btn">Go Explore</a>
        </div>
      ) : (
        <section className="repos-main-section">
           <RepoList repos={bookmarkedRepos} isLoading={false} error={null} showOwner={true} />
        </section>
      )}
    </div>
  );
}
