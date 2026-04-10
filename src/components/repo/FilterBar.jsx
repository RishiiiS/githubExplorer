import React from 'react';
import './FilterBar.css';

export default function FilterBar({ 
  languages, 
  selectedLanguage, 
  onLanguageChange,
  sortBy,
  onSortChange
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="language-filter" className="filter-label">Language:</label>
        <select 
          id="language-filter"
          className="filter-select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="All">All</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter" className="filter-label">Sort by:</label>
        <select 
          id="sort-filter"
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>
      </div>
    </div>
  );
}
