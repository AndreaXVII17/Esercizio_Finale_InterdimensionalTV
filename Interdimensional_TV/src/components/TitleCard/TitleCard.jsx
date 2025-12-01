import React, { useEffect, useRef, useState, useContext } from "react";
import "./TitleCard.css";
import { FavouritesContext } from "../../context/FavouritesContext";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8",
    },
  };

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // NOTE: wheel-based horizontal scrolling removed per UX request.

  // updateButtons uses the current `cardsRef` element to decide whether
  // to show the left/right scroll buttons. Defined here so it can be
  // called after API data loads and from listeners.
  const updateButtons = () => {
    const el = cardsRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    // Fetch API in italiano
    fetch(
      `https://api.themoviedb.org/3/movie/${category ?? "now_playing"}?language=it-IT&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const el = cardsRef.current;

    // Eventi scroll + resize
    el && el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);

    // Aggiorna pulsanti dopo layout
    setTimeout(updateButtons, 50);

    return () => {
      el && el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [category]);

  // Ensure buttons are updated when cards are rendered/changed
  useEffect(() => {
    setTimeout(updateButtons, 50);
  }, [apiData]);

  // Scroll orizzontale per intera "pagina"
  const scrollByPage = (dir = 1) => {
    const el = cardsRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="title-cards">
      <h2>{title ?? "Popular on Netflix"}</h2>

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

        <div className="card-list" ref={cardsRef}>
          {apiData.map((card) => {
            const fav = isFavourite(card.id);

            return (
              <div className="card" key={card.id}>
                <Link to={`/movie/${card.id}`}>
                  <img
                    src={
                      card.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                        : "https://via.placeholder.com/500x300?text=No+Image"
                    }
                    alt={card.title || card.original_title}
                    loading="lazy"
                  />
                </Link>

                {/* Preferiti */}
                <button
                  className="fav-circle"
                  onClick={() =>
                    fav ? removeFavourite(card.id) : addFavourite(card)
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

                <p>{card.title || card.original_title}</p>
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

export default TitleCards;
