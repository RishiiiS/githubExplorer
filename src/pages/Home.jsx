import React, { useState } from 'react';
import { Search, Command, Terminal, Blocks, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Explore developers and their work</h1>
        
        <form className="search-wrapper" onSubmit={handleSearch}>
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search developers, stacks, or locations..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-shortcut">
            <Command size={12} />
            <span>K</span>
          </div>
        </form>

        <div className="suggested-searches-container">
          <p className="suggested-title">SUGGESTED SEARCHES</p>
          <div className="suggested-tags">
            <span className="suggested-tag">React Architects</span>
            <span className="suggested-tag">Rust Engineers in Berlin</span>
            <span className="suggested-tag">Machine Learning Leads</span>
            <span className="suggested-tag">Open Source Contributors</span>
          </div>
        </div>
      </div>

      <div className="features-banner">
        <div className="feature-item">
          <Terminal size={18} />
          <span>CLI</span>
        </div>
        <div className="feature-item">
          <Blocks size={18} />
          <span>API</span>
        </div>
        <div className="feature-item">
          <Zap size={18} />
          <span>FAST</span>
        </div>
      </div>
    </div>
  );
}
