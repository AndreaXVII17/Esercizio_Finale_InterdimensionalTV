import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";
import "./Favorites.css";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <h1>I tuoi Preferiti</h1>

      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>Nessun preferito salvato.</p>
        ) : (
          favorites.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="fav-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
              />
              <p>{movie.title || movie.name}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
