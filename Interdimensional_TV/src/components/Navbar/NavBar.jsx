import React, { useState } from "react";
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    } else {
      navigate(`/search`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className='navbar'>

      {/* LEFT */}
      <div className="navbar-left">

        {/* LOGO → Home */}
        <img
          src={logo}
          alt="logo"
          className="img"
          role="button"
          tabIndex={0}
          onClick={() => navigate('/')}
          onKeyDown={(e) => { if (e.key === 'Enter') navigate('/'); }}
          style={{ cursor: 'pointer' }}
        />

        {/* MENU */}
        <ul>
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/serietv" className={({ isActive }) => isActive ? 'active' : ''}>Serie TV</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={({ isActive }) => isActive ? 'active' : ''}>Film</NavLink>
          </li>
          <li>
            <NavLink to="/favourites" className={({ isActive }) => isActive ? 'active' : ''}>Preferiti</NavLink>
          </li>
        </ul>

      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        {/* CERCA */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Cerca film o serie TV..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />

          <img
            src={search_icon}
            alt="Cerca"
            className='icons'
            onClick={handleSearchClick}
          />
        </div>

        <img src={bell_icon} alt="Notifiche" className='icons' />

        <div className="navbar-profile">
          <img src={profile_img} alt="Profilo" className='profile' />
          <img src={caret_icon} alt="Apri menu" />

          <div className="dropdown">
            <p>Sign Out</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Navbar;
