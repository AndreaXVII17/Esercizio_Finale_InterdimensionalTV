import './App.css';
import React from 'react';
import Footer from './components/Footer/Footer';

// Le tue pagine
import Home from './pages/Home/Home';
import Detail from './components/Details/Detail';
import SearchResults from "./pages/SearchResults.jsx";
import SerieTv from './pages/SerieTv/SerieTv';
import Film from './components/film/Film.jsx';
import NotFound from './pages/NotFound';

import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <div className="app-root">
      <main className="app-main">
      <Routes>

        {/* HOME */}
        <Route path='/' element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<Home />} />

        {/* DETTAGLI FILM */}
        <Route path='/movie/:id' element={<Detail mediaType="movie" />} />

        {/* DETTAGLI SERIE TV */}
        <Route path='/tv/:id' element={<Detail mediaType="tv" />} />

        {/* PAGINA RISULTATI RICERCA */}
        <Route path='/search' element={<SearchResults />} />
        {/* PAGINA SERIE TV */}
        <Route path='/serietv' element={<SerieTv />} />
        {/* PAGINA FILM */}
        <Route path='/movies' element={<Film />} />

        {/* 404 - Not Found */}
        <Route path='*' element={<NotFound />} />

      </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
