import { IMAGE_BASE } from "../api/tmdb.js";

export default function Row({ title, movies }) {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">
        {movies?.map(movie => (
          <img
            key={movie.id}
            className="row-poster"
            src={IMAGE_BASE + movie.poster_path}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
}
