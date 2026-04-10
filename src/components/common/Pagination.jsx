import React from 'react';
import './Pagination.css';

export default function Pagination() {
  return (
    <div className="pagination">
      <button className="page-btn nav-btn" disabled>&lt;</button>
      <button className="page-btn active">1</button>
      <button className="page-btn">2</button>
      <button className="page-btn">3</button>
      <span className="page-ellipsis">...</span>
      <button className="page-btn">42</button>
      <button className="page-btn nav-btn">&gt;</button>
    </div>
  );
}
