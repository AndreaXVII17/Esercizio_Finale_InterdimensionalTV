import "./App.css";
import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

// Context
import { FavouritesProvider } from "./context/FavouritesContext";

// Componenti comuni
import Footer from "./components/Footer/Footer";

// Pagine
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults";
import Favourites from "./pages/Favourites";
import SerieTv from "./pages/SerieTv/SerieTv";
import Film from "./components/film/Film.jsx";
import Detail from "./components/Details/Detail";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <FavouritesProvider>
      <div className="app-root">
        <main className="app-main">

          <Routes>
            {/* HOME */}
            {/* il collega vuole che / reindirizzi a /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />

            {/* RISULTATI RICERCA */}
            <Route path="/search" element={<SearchResults />} />

            {/* PREFERITI */}
            <Route path="/favourites" element={<Favourites />} />

            {/* DETTAGLI FILM */}
            <Route path="/movie/:id" element={<Detail mediaType="movie" />} />

            {/* DETTAGLI SERIE TV */}
            <Route path="/tv/:id" element={<Detail mediaType="tv" />} />

            {/* PAGINE CATEGORIE (entrambe le versioni) */}
            <Route path="/serietv" element={<SerieTv />} />
            <Route path="/series" element={<SerieTv />} />

            <Route path="/movies" element={<Film />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </main>

        {/* Footer del collega */}
        <Footer />
      </div>
    </FavouritesProvider>
  );
};

export default App;
