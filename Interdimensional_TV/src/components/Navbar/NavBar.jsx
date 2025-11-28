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
      <div className="navbar-left">
        <img src={logo} alt="logo" className="img"/>

        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li>Serie TV</li>
          <li>Film</li>
          <li>New Popular</li>
          <li>My List</li>

          {/* 👉 AGGIUNTA QUI — Link ai preferiti */}
          <li onClick={() => navigate("/favourites")}>Preferiti </li>
        </ul>
      </div>

      <div className="navbar-right">
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
        <img src={bell_icon} alt="" className='icons' />

        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
