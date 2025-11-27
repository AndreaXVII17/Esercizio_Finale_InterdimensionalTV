import { useEffect, useState } from "react";

import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import "./HeroBanner.css";
export default function HeroBanner() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [featured, setFeatured] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  async function loadRandomFeatured() {
    try {
      // film in voga
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=it-IT`
      );
      const data = await res.json();

      const validItems = data.results.filter(
        item => item.backdrop_path !== null
      );

      const random = validItems[Math.floor(Math.random() * validItems.length)];
      setFeatured(random);

      const type = random.media_type === "movie" ? "movie" : "tv";

      //  Fetch video
      const videoRes = await fetch(
        `https://api.themoviedb.org/3/${type}/${random.id}/videos?api_key=${API_KEY}&language=it-IT`
      );
      const videoData = await videoRes.json();

      //  Trailer 
      let trailer =
        videoData.results.find(
          v => v.type === "Trailer" && v.site === "YouTube" && v.official
        ) ||
        videoData.results.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        ) ||
        videoData.results.find(
          v => v.type === "Teaser" && v.site === "YouTube"
        ) ||
        null;

      setVideoKey(trailer ? trailer.key : null);
    } catch (e) {
      console.error("Errore Hero:", e);
    }
  }

  useEffect(() => {
    loadRandomFeatured();
    const t = setInterval(loadRandomFeatured, 20000);
    return () => clearInterval(t);
  }, []);

  if (!featured) return null;

  return (
    <div className="hero">

      {/*autoplay yt */}
      {videoKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
          className="banner-img"
          allow="autoplay"
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
          className="banner-img"
          alt="Hero Background"
        />
      )}

      {/*  Caption */}
      <div className="hero-caption">
        <h1 className="caption-img" style={{ color: "white", fontSize: "25px", fontWeight: "700" }}>
          {featured.title || featured.name}
        </h1>

        {/* <p>
          {featured.overview}
        </p> */}

        <div className="hero-btns">
          <button className="btn">
            <img src={play_icon} alt="" />
            Play
          </button>

          <button className="btn dark-btn">
            <img src={info_icon} alt="" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
