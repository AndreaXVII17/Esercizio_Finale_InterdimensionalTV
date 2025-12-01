const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

// 🔥 POPOLARI
export function getPopularMovies() {
  return fetchJSON(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT&page=1`
  );
}

// ⭐ VOTATI (TOP RATED)
export function getTopRatedMovies() {
  return fetchJSON(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=it-IT&page=1`
  );
}

// 🆕 IN USCITA
export function getUpcomingMovies() {
  return fetchJSON(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=it-IT&page=1`
  );
}

// 🎬 PER GENERE (ad esempio: azione=28, commedia=35, horror=27)
export function getMoviesByGenre(genreId) {
  return fetchJSON(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=it-IT&page=1`
  );
}
