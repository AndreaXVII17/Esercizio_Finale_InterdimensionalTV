import { useEffect, useState } from "react";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import "./HeroBanner.css";
import { Link } from "react-router-dom";


export default function HeroBannerFoto() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [featured, setFeatured] = useState(null);

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
          <button className="btn">
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
  );
}
