import React, { useEffect, useRef, useState, useContext } from "react";
import "../../components/TitleCard/TitleCard.css";
import "./Film.css";
import { FavouritesContext } from "../../context/FavouritesContext";
import { Link } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8",
  },
};

const MovieRow = ({ title, category }) => {
  const [items, setItems] = useState([]);
  const rowRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);

  const updateButtons = () => {
    const el = rowRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=it-IT&page=1`,
          options
        );
        const data = await res.json();
        setItems(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    const el = rowRef.current;

    el && el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    setTimeout(updateButtons, 50);

    return () => {
      el && el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [category]);

  useEffect(() => {
    setTimeout(updateButtons, 50);
  }, [items]);

  const scrollByPage = (dir = 1) => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="row-wrapper">
        {showLeft && (
          <button
            className="scroll-btn left"
            onClick={() => scrollByPage(-1)}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        <div className="card-list" ref={rowRef}>
          {items.map((it) => {
            const fav = isFavourite(it.id);
            return (
              <div className="card" key={it.id}>
                <Link to={`/movie/${it.id}`}>
                  <img
                    src={
                      it.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${it.backdrop_path}`
                        : "https://via.placeholder.com/500x280?text=No+Image"
                    }
                    alt={it.title}
                    loading="lazy"
                  />
                </Link>

                <button
                  className="fav-circle"
                  onClick={() =>
                    fav
                      ? removeFavourite(it.id)
                      : addFavourite({
                          id: it.id,
                          media_type: "movie",
                          poster_path: it.backdrop_path || null,
                          title: it.title || null,
                        })
                  }
                >
                  <svg
                    className={`heart-svg ${fav ? "active" : ""}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z" />
                  </svg>
                </button>

                <p>{it.title}</p>
              </div>
            );
          })}
        </div>

        {showRight && (
          <button
            className="scroll-btn right"
            onClick={() => scrollByPage(1)}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default function Film() {
  return (
    <div className="film-page">
      <div className="film-container">
        <MovieRow title="Popolari" category="popular" />
        <MovieRow title="I più votati" category="top_rated" />
        <MovieRow title="In arrivo" category="upcoming" />
        <MovieRow title="In sala / Now Playing" category="now_playing" />
      </div>
    </div>
  );
}
