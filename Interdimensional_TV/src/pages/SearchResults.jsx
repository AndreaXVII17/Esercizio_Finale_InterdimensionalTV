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
        // film
        const movieRes = await fetch(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=it-IT`,
          options
        );
        const movieData = await movieRes.json();

        // serie tv
        const tvRes = await fetch(
          `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=it-IT`,
          options
        );
        const tvData = await tvRes.json();

        setMovies(movieData.results || []);
        setTvShows(tvData.results || []);

        // suggerimento se vuoto
        if (
          movieData.results?.length === 0 &&
          tvData.results?.length === 0
        ) {
          const partial = query.slice(0, 3);
          const suggestRes = await fetch(
            `${BASE_URL}/search/movie?query=${encodeURIComponent(partial)}&language=it-IT`,
            options
          );
          const suggestData = await suggestRes.json();

          if (suggestData.results.length > 0) {
            setSuggestion(suggestData.results[0]);
          }
        } else {
          setSuggestion(null);
        }
      } catch (err) {
        console.error("Errore ricerca:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundColor: "#111",
          minHeight: "100vh",
          padding: "100px 40px 40px",
          color: "white",
        }}
      >
        {/* BACK (solo se lo vuoi) */}
        <BackButton />

        {/* BARRA DI RICERCA */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Cerca film o serie TV..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              padding: "15px 20px",
              width: "400px",
              maxWidth: "90%",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#222",
              color: "white",
            }}
          />
        </div>

        {/* loading */}
        {loading && (
          <p style={{ textAlign: "center", color: "#bbb" }}>Caricamento...</p>
        )}

        {/* nessun risultato */}
        {!loading && movies.length === 0 && tvShows.length === 0 && query && (
          <div style={{ textAlign: "center", fontSize: "20px" }}>
            Nessun titolo trovato
          </div>
        )}

        {/* suggerimento */}
        {!loading && suggestion && (
          <div style={{ textAlign: "center", color: "#ff3c3c" }}>
            Forse cercavi: <strong>{suggestion.title}</strong>
          </div>
        )}

        {/* FILM */}
        {movies.length > 0 && (
          <section style={{ marginTop: "40px" }}>
            <h2>🎬 Film trovati</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "20px",
              }}
            >
              {movies.map((movie) => (
                <div key={movie.id} style={{ position: "relative" }}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=Nessuna+Immagine"
                    }
                    alt={movie.title}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />

                  {/* preferiti */}
                  <button
                    className="fav-circle"
                    onClick={() =>
                      isFavourite(movie.id)
                        ? removeFavourite(movie.id)
                        : addFavourite(movie)
                    }
                  >
                    <svg
                      className={`heart-svg ${
                        isFavourite(movie.id) ? "active" : ""
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 
                               22 8.5c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z"/>
                    </svg>
                  </button>

                  <p style={{ textAlign: "center", marginTop: "8px" }}>
                    {movie.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SERIE TV */}
        {tvShows.length > 0 && (
          <section style={{ marginTop: "40px" }}>
            <h2>📺 Serie TV trovate</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "20px",
              }}
            >
              {tvShows.map((tv) => (
                <div key={tv.id} style={{ position: "relative" }}>
                  <img
                    src={
                      tv.poster_path
                        ? `https://image.tmdb.org/t/p/w300${tv.poster_path}`
                        : "https://via.placeholder.com/300x450?text=Nessuna+Immagine"
                    }
                    alt={tv.name}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />

                  <p style={{ textAlign: "center", marginTop: "8px" }}>
                    {tv.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
