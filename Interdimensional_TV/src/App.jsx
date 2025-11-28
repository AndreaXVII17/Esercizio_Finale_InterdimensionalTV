import './App.css';
import React from "react";

import { Routes, Route } from "react-router-dom";

// Pagine
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults";
import Favourites from "./pages/Favourites";

import { FavouritesProvider } from "./context/FavouritesContext";
import Layout from "./layout";    // 👈 importa il layout


const App = () => {
  return (
    <FavouritesProvider>
      <Routes>

        {/* Layout che contiene Navbar */}
        <Route element={<Layout />}>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* RISULTATI RICERCA */}
          <Route path="/search" element={<SearchResults />} />

          {/* PREFERITI */}
          <Route path="/favourites" element={<Favourites />} />

        </Route>

      </Routes>
    </FavouritesProvider>
  );
};

export default App;
