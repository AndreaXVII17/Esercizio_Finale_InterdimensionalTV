import React from "react";
// NavBar is provided by Layout
import { useFavourites } from "../context/FavouritesContext";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";

export default function Favourites() {
  const { favourites, removeFavourite } = useFavourites();

  return (
    <div style={{ backgroundColor: "#111", minHeight: "100vh", color: "white" }}>
      <div
        style={{
          padding: "50px",
          paddingTop: "120px",
          position: "relative",
        }}
      >

     

      {/* Back button + 🎬 TITOLO STILE NETFLIX + contatore cuore */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
       
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            margin: 0,
            paddingLeft: "5px",
          }}
        >
          La tua lista
        </h1>
        

        <div style={{ marginLeft: 8 }} />

        <div
          aria-hidden
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,0,0,0.6)",
            padding: "6px 12px",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BackButton />
          </div>
          <svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: "black", stroke: "white", strokeWidth: 2 }}>
            <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z" />
          </svg>
          <span style={{ color: "white", fontWeight: 700 }}>{favourites.length}</span>
        </div>
      </div>

      {/* ⭐ SOTTOTITOLO */}
      <p
        style={{
          marginTop: "6px",
          fontSize: "16px",
          color: "#b3b3b3",
          paddingLeft: "5px",
        }}
      >
        Hai {favourites.length} titoli salvati
      </p>

      {/* Nessun preferito */}
      {favourites.length === 0 && (
        <p style={{ marginTop: "40px", fontSize: "18px", color: "#ccc" }}>
          Non hai ancora aggiunto titoli alla tua lista.
        </p>
      )}

      {/* Griglia stile Netflix */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {favourites.map((item) => {
          // determine media type: prefer explicit media_type, fallback to 'movie'
          const media = item.media_type || (item.first_air_date ? "tv" : "movie");
          const to = `/${media}/${item.id}`;

          return (
            <div key={`${media}-${item.id}`} style={{ position: "relative" }}>
              <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "https://via.placeholder.com/300x450?text=Nessuna+Immagine"
                  }
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    display: "block",
                  }}
                  alt={item.title || item.name}
                  loading="lazy"
                />

                <p
                  style={{
                    marginTop: "8px",
                    textAlign: "left",
                    paddingLeft: "4px",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  {item.title || item.name}
                </p>
              </Link>

              {/*  bottone rimuovi */}
              <button
                onClick={() => removeFavourite(item.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
