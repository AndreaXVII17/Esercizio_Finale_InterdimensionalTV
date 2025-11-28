import './App.css';
import React from 'react';

// Le tue pagine
import Home from './pages/Home/Home';
import Detail from './components/Details/Detail';
import SearchResults from "./pages/SearchResults.jsx";
import SerieTv from './pages/SerieTv/SerieTv';
import Film from './components/film/Film.jsx';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>

        {/* HOME */}
        <Route path='/' element={<Home />} />

        {/* DETTAGLI FILM */}
        <Route path='/movie/:id' element={<Detail mediaType="movie" />} />

        {/* DETTAGLI SERIE TV */}
        <Route path='/tv/:id' element={<Detail mediaType="tv" />} />

        {/* PAGINA RISULTATI RICERCA */}
        <Route path='/search' element={<SearchResults />} />
        {/* PAGINA SERIE TV */}
        <Route path='/series' element={<SerieTv />} />
        {/* PAGINA FILM */}
        <Route path='/movies' element={<Film />} />

      </Routes>
    </div>
  );
};

export default App;
