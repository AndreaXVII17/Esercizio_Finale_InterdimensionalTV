import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);

  const fav = isFavourite(movie.id);

  // FIX IMMAGINI !!!
  const imgPath =
    movie.poster_path ||
    movie.backdrop_path ||
    null;

  return (
    <div className="movie-card">
      <img
        src={
          imgPath
            ? `https://image.tmdb.org/t/p/w300${imgPath}`
            : "https://via.placeholder.com/300x450?text=Nessuna+Immagine"
        }
        alt={movie.title || movie.name}
      />

      {/* ❤️ bottone preferiti con cuore SVG */}
      <button
        className="fav-circle"
        onClick={() =>
          fav ? removeFavourite(movie.id) : addFavourite(movie)
        }
      >
        <svg
          className={`heart-svg ${fav ? "active" : ""}`}
          viewBox="0 0 24 24"
        >
          <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 
                   22 8.5c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z"/>
        </svg>
      </button>

      <p className="movie-title">{movie.title || movie.name}</p>
    </div>
  );
}
