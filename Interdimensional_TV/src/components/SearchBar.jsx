import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
// NavBar is provided by Layout

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <>
      <div className="searchbar-container">
        <input
          type="text"
          className="searchbar-input"
          placeholder="Cerca film o serie TV..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default SearchBar;
