import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">Sorry, we couldn't find the page you were looking for.</p>

        <div className="notfound-links">
          <Link to="/home" className="btn notfound-btn">Home</Link>
          <Link to="/movies" className="btn notfound-btn">Movies</Link>
          <Link to="/serietv" className="btn notfound-btn">Series</Link>
          <Link to="/search" className="btn notfound-btn">Search</Link>
        </div>
      </div>
    </div>
  );
}
