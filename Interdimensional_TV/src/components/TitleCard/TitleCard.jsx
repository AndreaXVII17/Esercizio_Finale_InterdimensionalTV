import React, { useEffect, useRef, useState, useContext } from "react";
import "./TitleCard.css";
import { FavouritesContext } from "../../context/FavouritesContext";

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

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ?? "now_playing"}?language=it-IT&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ?? "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => {
          const fav = isFavourite(card.id);

          return (
            <div key={card.id} className="card">
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                    : "https://via.placeholder.com/500x300?text=No+Image"
                }
                alt={card.title}
              />

              {/* ❤️ bottone preferiti con svg */}
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
    </div>
  );
};

export default TitleCards;
