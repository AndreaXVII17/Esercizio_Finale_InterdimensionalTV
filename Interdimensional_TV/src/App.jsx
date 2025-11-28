import './App.css';
import React from "react";

import { Routes, Route } from "react-router-dom";

// Pagine
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults";
import Favourites from "./pages/Favourites";
import SerieTv from "./pages/SerieTv/SerieTv";
import Film from "./components/film/Film.jsx";

// Componenti dettaglio
import Detail from "./components/Details/Detail";

// Context
import { FavouritesProvider } from "./context/FavouritesContext";

const App = () => {
  return (
    <FavouritesProvider>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* RISULTATI RICERCA */}
        <Route path="/search" element={<SearchResults />} />

        {/* PREFERITI */}
        <Route path="/favourites" element={<Favourites />} />

        {/* DETTAGLI FILM */}
        <Route path="/movie/:id" element={<Detail mediaType="movie" />} />

        {/* DETTAGLI SERIE TV */}
        <Route path="/tv/:id" element={<Detail mediaType="tv" />} />

        {/* PAGINE CATEGORIE */}
        <Route path="/series" element={<SerieTv />} />
        <Route path="/movies" element={<Film />} />

      </Routes>
    </FavouritesProvider>
  );
};

export default App;
