import './App.css';
import React from 'react';
import Home from './pages/Home/Home';
import Detail from './components/Details/Detail';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/movie/:id' element={<Detail mediaType="movie" />} />
      <Route path='/tv/:id' element={<Detail mediaType="tv" />} />

    </Routes>
  );
};

export default App;
