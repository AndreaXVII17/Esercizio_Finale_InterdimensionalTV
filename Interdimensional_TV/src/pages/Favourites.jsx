import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

export default function Favourites() {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#111",
        minHeight: "100vh",
        color: "white",
        position: "relative",
      }}
    >
      {/* 🔙 Back */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "none",
          border: "none",
          color: "white",
          fontSize: "25px",
          cursor: "pointer",
        }}
      >
        ←
      </button>

      {/* 🎬 TITOLO STILE NETFLIX */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "6px",
          paddingLeft: "5px",
        }}
      >
        La tua lista
      </h1>

      {/* ⭐ CONTATORE A DESTRA – stile Netflix */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(0,0,0,0.6)",
          padding: "8px 14px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {/* ❤️ cuore nero + perimetro bianco */}
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          style={{
            fill: "black",
            stroke: "white",
            strokeWidth: 2,
          }}
        >
          <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 
                   22 8.5c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z" />
        </svg>

        {/* Numero preferiti */}
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {favourites.length}
        </span>
      </div>

      {/* ⭐ SOTTOTITOLO */}
      <p
        style={{
          marginTop: "0px",
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
        {favourites.map((item) => (
          <div key={item.id} style={{ position: "relative" }}>
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
        ))}
      </div>
    </div>
  );
}
