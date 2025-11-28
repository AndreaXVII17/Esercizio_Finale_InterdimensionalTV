import React, { useState } from "react";
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { useNavigate } from "react-router-dom";

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
        {/* LOGO → naviga alla home */}
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
          <li onClick={() => navigate('/')} role="button">Home</li>

          <li
            onClick={() => navigate('/series')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/series'); }}
          >
            Serie TV
          </li>

          <li
            onClick={() => navigate('/movies')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/movies'); }}
          >
            Film
          </li>

          <li>New Popular</li>
          <li>My List</li>

          {/* Preferiti */}
          <li onClick={() => navigate("/favourites")}>Preferiti</li>
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
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "none",
              outline: "none",
              width: "200px"
            }}
          />

          <img
            src={search_icon}
            alt="Cerca"
            className='icons'
            onClick={handleSearchClick}
            style={{ cursor: "pointer", marginLeft: "8px" }}
          />
        </div>

        <p>Children</p>
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
