import { useEffect, useState } from "react";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import "./HeroBanner.css";
import { Link } from "react-router-dom";


export default function HeroBannerFoto() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [featured, setFeatured] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [notification, setNotification] = useState(null);

  async function loadRandomFeatured() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=it-IT`
      );
      const data = await res.json();

      // Filtriamo solo contenuti con una immagine valida
      const validItems = data.results.filter(
        (item) => item.backdrop_path !== null
      );

      // Scegliamo un contenuto random
      const random =
        validItems[Math.floor(Math.random() * validItems.length)];

      setFeatured(random);

    } catch (err) {
      console.error("Errore Hero (immagini):", err);
    }
  }

  useEffect(() => {
    loadRandomFeatured();
    const interval = setInterval(loadRandomFeatured, 10000); // cambia ogni 10s
    return () => clearInterval(interval);
  }, []);

  if (!featured) return null;

  return (
    <>
    <div className="hero">

      {/* IMMAGINE HERO */}
      <img
        src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
        alt="hero"
        className="banner-img"
      />

   
      <div className="hero-caption">

        {/* Titolo */}
        <h1 className="caption-img"
            style={{ color: "white", fontSize: "25px", fontWeight: "700" }}>
          {featured.title || featured.name}
        </h1>

        
        {/* <p>{featured.overview}</p> */}

        <div className="hero-btns">
          <button
            className="btn"
            onClick={async () => {
              try {
                const type = featured.media_type === "tv" ? "tv" : "movie";
                const res = await fetch(
                  `https://api.themoviedb.org/3/${type}/${featured.id}/videos?api_key=${API_KEY}&language=it-IT`
                );
                const data = await res.json();
                // Prefer trailer hosted on YouTube
                const trailer =
                  data.results.find(
                    (v) => v.type === "Trailer" && v.site === "YouTube"
                  ) || data.results[0];
                if (trailer && trailer.key) {
                  setTrailerKey(trailer.key);
                  setShowTrailer(true);
                  setNotification(null);
                } else {
                  // show temporary toast instead of blocking alert
                  setNotification("Trailer non disponibile per questo titolo");
                  setTimeout(() => setNotification(null), 3000);
                }
              } catch (err) {
                console.error("Errore fetching trailer:", err);
              }
            }}
          >
            <img src={play_icon} alt="" />
            Play
          </button>

          <Link to={`/${featured.media_type}/${featured.id}`}>
  <button className="btn dark-btn">
    <img src={info_icon} alt="" />
    More Info
  </button>
</Link>

        </div>
      </div>
    </div>
    {/* Trailer Modal */}
    {showTrailer && (
      <div className="hero-trailer-overlay" onClick={() => { setShowTrailer(false); setTrailerKey(null); }}>
        <div className="hero-trailer-content" onClick={(e) => e.stopPropagation()}>
          <button aria-label="Chiudi trailer" className="hero-trailer-close" onClick={() => { setShowTrailer(false); setTrailerKey(null); }}>
            ✕
          </button>

          {trailerKey ? (
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              className="hero-trailer-iframe"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div style={{ color: "#fff", padding: 20 }}>Trailer non disponibile</div>
          )}
        </div>
      </div>
    )}

    {notification && (
      <div role="status" aria-live="polite" className="hero-notification">
        <div className="hero-notification-dot" />
        <div className="hero-notification-message">{notification}</div>
      </div>
    )}
    </>
  );
}
