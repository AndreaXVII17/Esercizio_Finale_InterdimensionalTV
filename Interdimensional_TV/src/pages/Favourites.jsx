import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import BackButton from "../components/BackButton/BackButton";

export default function Favourites() {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#111",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* 🔙 Torna Indietro */}
      <BackButton />

      <h1 style={{ marginTop: "20px" }}>I tuoi preferiti ❤️</h1>

      {favourites.length === 0 && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          Non hai ancora aggiunto film o serie TV ai preferiti.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {favourites.map((item) => (
          <div
            key={item.id}
            style={{ position: "relative", borderRadius: "8px" }}
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                  : "https://via.placeholder.com/300x450?text=Nessuna+Immagine"
              }
              style={{ width: "100%", borderRadius: "8px" }}
            />

            {/* ❌ Rimuovi */}
            <button
              onClick={() => removeFavourite(item.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "26px",
                cursor: "pointer",
                color: "red",
              }}
            >
              ❌
            </button>

            <p style={{ textAlign: "center", marginTop: "8px" }}>
              {item.title || item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
