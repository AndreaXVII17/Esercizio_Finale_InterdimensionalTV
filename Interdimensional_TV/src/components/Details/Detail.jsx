import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detail.css";
import actorPlaceholder from '../../assets/actor-placeholder.svg';
import backdropPlaceholder from '../../assets/backdrop-placeholder.svg';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Detail({ mediaType }) {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

    const castRef = useRef(null);
    const similarRef = useRef(null);
    const [castLeft, setCastLeft] = useState(false);
    const [castRight, setCastRight] = useState(false);
    const [simLeft, setSimLeft] = useState(false);
    const [simRight, setSimRight] = useState(false);



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

  // manage visibility of scroll buttons for cast and similar lists
  useEffect(() => {
    const castEl = castRef.current;
    const similarEl = similarRef.current;

    const updateCast = () => {
      if (!castEl) return;
      setCastLeft(castEl.scrollLeft > 0);
      setCastRight(castEl.scrollLeft + castEl.clientWidth < castEl.scrollWidth - 1);
    };

    const updateSim = () => {
      if (!similarEl) return;
      setSimLeft(similarEl.scrollLeft > 0);
      setSimRight(similarEl.scrollLeft + similarEl.clientWidth < similarEl.scrollWidth - 1);
    };

    if (castEl) {
      castEl.addEventListener('scroll', updateCast, { passive: true });
      window.addEventListener('resize', updateCast);
      setTimeout(updateCast, 50);
    }

    if (similarEl) {
      similarEl.addEventListener('scroll', updateSim, { passive: true });
      window.addEventListener('resize', updateSim);
      setTimeout(updateSim, 50);
    }

    return () => {
      if (castEl) castEl.removeEventListener('scroll', updateCast);
      if (similarEl) similarEl.removeEventListener('scroll', updateSim);
      window.removeEventListener('resize', updateCast);
      window.removeEventListener('resize', updateSim);
    };
  }, [cast, similar]);

  const scrollCast = (dir = 1) => {
    const el = castRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  const scrollSim = (dir = 1) => {
    const el = similarRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  if (!details) return <div className="detail-loading">Caricamento…</div>;

  const backdropUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : backdropPlaceholder;

  return (
    <div className="detail-page">
      <Link to="/" className="back-btn">← Torna alla Home</Link>

      <div className="detail-backdrop">
        <img
          className={`detail-backdrop-img`}
          src={backdropUrl}
          alt={details.title || details.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = backdropPlaceholder;
          }}
        />
        <div className="backdrop-overlay" />
      </div>

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
      <div className="row-wrapper">
        {castLeft && <button className="scroll-btn left" onClick={() => scrollCast(-1)} aria-label="Scroll cast left">‹</button>}
        <div className="detail-cast scroll-row" ref={castRef}>
          {cast.slice(0, 20).map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : actorPlaceholder
                }
                alt={actor.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = actorPlaceholder;
                }}
              />
              <p>{actor.name}</p>
              <small>{actor.character}</small>
            </div>
          ))}
        </div>
        {castRight && <button className="scroll-btn right" onClick={() => scrollCast(1)} aria-label="Scroll cast right">›</button>}
      </div>

    
      <h2>Simili</h2>
      <div className="row-wrapper">
        {simLeft && <button className="scroll-btn left" onClick={() => scrollSim(-1)} aria-label="Scroll similar left">‹</button>}
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
        {simRight && <button className="scroll-btn right" onClick={() => scrollSim(1)} aria-label="Scroll similar right">›</button>}
      </div>
    </div>
  );
}
