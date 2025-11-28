import "./App.css";
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

// Layout
import Layout from "./layout";

const App = () => {
  return (
    <FavouritesProvider>
      <Routes>
        {/* Layout che contiene navbar/header ecc */}
        <Route element={<Layout />}>
          
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

          {/* PAGINE CATEGORIA */}
          <Route path="/series" element={<SerieTv />} />
          <Route path="/movies" element={<Film />} />

        </Route>
      </Routes>
    </FavouritesProvider>
  );
};

export default App;
