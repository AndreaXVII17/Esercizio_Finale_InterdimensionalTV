import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FavouritesContext } from "../context/FavouritesContext";
import BackButton from "../components/BackButton/BackButton";
import Navbar from "../components/Navbar/NavBar";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8",
  },
};

export default function SearchResults() {
  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParam = new URLSearchParams(location.search).get("query") || "";
  const [query, setQuery] = useState(queryParam);

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  // aggiorna URL quando query cambia
  useEffect(() => {
    navigate(`/search?query=${encodeURIComponent(query)}`, { replace: true });
  }, [query]);

  // ricerca API
  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTvShows([]);
      setSuggestion(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const movieRes = await fetch(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=it-IT`,
          options
        );
        const movieData = await movieRes.json();

        const tvRes = await fetch(
          `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=it-IT`,
          options
        );
        const tvData = await tvRes.json();

        setMovies(movieData.results || []);
        setTvShows(tvData.results || []);

        if (movieData.results?.length === 0 && tvData.results?.length ==
