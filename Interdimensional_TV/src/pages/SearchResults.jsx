import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/NavBar";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8"
  }
};

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search).get("query") || "";

  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  // Aggiorna URL
  useEffect(() => {
    navigate(`/search?query=${encodeURIComponent(query)}`, { replace: true });
  }, [query]);

  // Ricerca
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
        // 🎬 FILM
        const movieRes = await fetch(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=it-IT`,
          options
        );
        const movieData = await movieRes.json();

        // 📺 SERIE TV
        const tvRes = await fetch(
          `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=it-IT`,
          options
        );
        const tvData = await tvRes.json();

        setMovies(movieData.results || []);
        setTvShows(tvData.results || []);

        // Suggerimento se nessun risultato
        if (
          (movieData.results?.length === 0) &&
          (tvData.results?.length === 0)
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
      <div style={{ backgroundColor: "#111", minHeight: "100vh", padding: "100px 40px 40px", color: "white" }}>

      {/* Search input */}
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
            outline: "none",
            backgroundColor: "#222",
            color: "white"
          }}
        />
      </div>

      {/* Loader */}
      {loading && (
        <p style={{ textAlign: "center", color: "#bbb" }}>Caricamento...</p>
      )}

      {/* Nessun risultato */}
      {!loading && movies.length === 0 && tvShows.length === 0 && query && (
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          Nessun titolo trovato 😢
        </div>
      )}

      {/* Suggerimento */}
      {!loading && suggestion && (
        <div style={{ textAlign: "center", fontSize: "18px", color: "#ff3c3c" }}>
          Forse cercavi: <strong>{suggestion.title}</strong>
        </div>
      )}

      {/* 🎬 Sezione Film */}
      {movies.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "10px" }}>🎬 Film trovati</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px"
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=Nessuna+Immagine"
                  }
                  alt={movie.title}
                  style={{ width: "100%" }}
                />
                <p style={{ textAlign: "center", marginTop: "8px" }}>
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📺 Sezione Serie TV */}
      {tvShows.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "10px" }}>📺 Serie TV trovate</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px"
            }}
          >
            {tvShows.map((tv) => (
              <div
                key={tv.id}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/w300${tv.poster_path}`
                      : "https://via.placeholder.com/300x450?text=Nessuna+Immagine"
                  }
                  alt={tv.name}
                  style={{ width: "100%" }}
                />
                <p style={{ textAlign: "center", marginTop: "8px" }}>
                  {tv.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
