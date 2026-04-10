import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Book, Star, Users } from 'lucide-react';
import FilterBar from '../components/repo/FilterBar';
import RepoList from '../components/repo/RepoList';
import UserProfileSidebar from '../components/user/UserProfileSidebar';
import { getUserRepos, getUserProfile } from '../services/github';
import './UserRepos.css';

export default function UserRepos() {
  const { username } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('stars');
  
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [profileData, reposData] = await Promise.all([
          getUserProfile(username),
          getUserRepos(username)
        ]);
        setUserProfile(profileData);
        setRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const availableLanguages = useMemo(() => {
    const langs = new Set(repos.map(r => r.language).filter(Boolean));
    return Array.from(langs);
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    let result = [...repos];

    if (selectedLanguage !== 'All') {
      result = result.filter(r => r.language === selectedLanguage);
    }

    result.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === 'forks') {
        return b.forks_count - a.forks_count;
      }
      return 0;
    });

    return result;
  }, [repos, selectedLanguage, sortBy]);

  return (
    <div className="user-repos-page">
      <div className="user-repos-layout">
        
        <UserProfileSidebar 
          userProfile={userProfile} 
          isLoading={isLoading} 
        />

        <main className="user-repos-main">
          <nav className="repo-nav-tabs">
            <div className="nav-tab active">
              <Book size={16} />
              Repositories 
              <span className="tab-badge">{userProfile?.public_repos || 0}</span>
            </div>
            <div className="nav-tab">
              <Star size={16} />
              Stars
            </div>
            <div className="nav-tab">
              <Users size={16} />
              Followers
            </div>
          </nav>

          <FilterBar 
            languages={availableLanguages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <section className="repos-main-section">
            <RepoList 
              repos={filteredAndSortedRepos} 
              isLoading={isLoading} 
              error={error} 
            />
          </section>
        </main>
      </div>
    </div>
  );
}
