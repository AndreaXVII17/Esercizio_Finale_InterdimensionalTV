import "./App.css";
import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

// Context
import { FavouritesProvider } from "./context/FavouritesContext";

// Componenti comuni
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";

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
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="movie/:id" element={<Detail mediaType="movie" />} />
              <Route path="tv/:id" element={<Detail mediaType="tv" />} />
              <Route path="serietv" element={<SerieTv />} />
              <Route path="series" element={<SerieTv />} />
              <Route path="movies" element={<Film />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

        </main>
      </div>
    </FavouritesProvider>
  );
};

export default App;
