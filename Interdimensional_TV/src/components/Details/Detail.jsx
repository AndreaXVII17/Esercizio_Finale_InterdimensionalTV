import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detail.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Detail({ mediaType }) {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const castRef = useRef(null);
  const similarRef = useRef(null);

// questo serve per lo scroll , uguale a titlecard 
const handleWheel = (ref) => (event) => {
  if (!ref.current) return;

  event.preventDefault();
  event.stopPropagation();
  ref.current.scrollLeft += event.deltaY;  
};



  useEffect(() => {
    async function loadAll() {
      // dettagli film
      const d = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      setDetails(d);

      // il cast
      const c = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      setCast(c.cast);

      // qui c'è fetch trailer su yt
      const v = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      const trailer =
        v.results.find(
          (x) => x.type === "Trailer" && x.site === "YouTube"
        ) || null;
      setTrailerKey(trailer ? trailer.key : null);

      // film simili consigliati 
      const s = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${API_KEY}&language=it-IT`
      ).then((r) => r.json());
      setSimilar(s.results);
    }

    loadAll();
  }, [id, mediaType]);

//listener per far si che scrolli solo se c'è il cursore sopra
  useEffect(() => {
    const castEl = castRef.current;
    const similarEl = similarRef.current;

    if (!castEl && !similarEl) return;

    const castWheel = handleWheel(castRef);
    const similarWheel = handleWheel(similarRef);

    if (castEl)
      castEl.addEventListener("wheel", castWheel, { passive: false });

    if (similarEl)
      similarEl.addEventListener("wheel", similarWheel, { passive: false });

    return () => {
      if (castEl) castEl.removeEventListener("wheel", castWheel);
      if (similarEl) similarEl.removeEventListener("wheel", similarWheel);
    };
  }, [cast, similar]); 

  if (!details) return <div className="detail-loading">Caricamento…</div>;

  return (
    <div className="detail-page">
      <Link to="/" className="back-btn">← Torna alla Home</Link>

      <div
        className="detail-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
        }}
      />

      <h1 className="detail-title">{details.title || details.name}</h1>

      <div className="detail-info">
        <span>
          {details.release_date?.slice(0, 4) ||
            details.first_air_date?.slice(0, 4)}
        </span>
        <span> • {details.genres.map((g) => g.name).join(", ")}</span>
      </div>

      <p className="detail-overview">{details.overview}</p>

      {trailerKey && (
        <div className="detail-trailer">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allow="autoplay"
            title="Trailer"
          />
        </div>
      )}

     
      <h2>Cast</h2>
      <div className="detail-cast scroll-row" ref={castRef}>
        {cast.slice(0, 20).map((actor) => (
          <div key={actor.id} className="cast-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300"
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <small>{actor.character}</small>
          </div>
        ))}
      </div>

    
      <h2>Simili</h2>
      <div className="similar-list scroll-row" ref={similarRef}>
        {similar.map((item) => (
          <Link
  to={`/${mediaType}/${item.id}`}
  key={item.id}
  className="similar-card"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>

            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt=""
            />
            <p>{item.title || item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
