import './App.css';
import React from 'react';


// Le tue pagine
import Home from './pages/Home/Home';
import SearchResults from "./pages/SearchResults.jsx";


import { Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Routes>


        {/* HOME */}
        <Route path='/' element={<Home />} />


        {/* PAGINA RISULTATI RICERCA */}
        <Route path='/search' element={<SearchResults />} />


      </Routes>
    </div>
  );
};


export default App;
