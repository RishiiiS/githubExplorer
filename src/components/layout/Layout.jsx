import React from 'react';
import { Moon, User } from 'lucide-react';
import './Layout.css';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-left">
          <Link to="/" className="brand-name">GitHub Explorer</Link>
        </div>
        <div className="header-right">
          <button className="icon-btn" aria-label="Toggle Theme"><Moon size={18} /></button>
          <div className="user-avatar" aria-label="User Profile">
            <User size={18} />
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-left">
          &copy; {new Date().getFullYear()} GitHub Explorer
        </div>
        <div className="footer-right">
          <a href="#">Docs</a>
          <a href="#">API</a>
          <a href="#">Status</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
