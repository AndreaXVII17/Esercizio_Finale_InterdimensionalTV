import React, { useEffect, useRef, useState } from "react";
import '../../components/TitleCard/TitleCard.css';
import './SerieTv.css';
import Navbar from "../../components/Navbar/NavBar";
import { Link } from "react-router-dom";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8'
  }
};

const TVRow = ({ title, category, linkTo = "/tv" }) => {
  const [items, setItems] = useState([]);
  const rowRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${category}?language=it-IT&page=1`,
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
    const updateButtons = () => {
      if (!el) return;
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    el && el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    setTimeout(updateButtons, 50);

    return () => {
      el && el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [category]);

  const scrollByPage = (dir = 1) => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="row-wrapper">
        {showLeft && <button className="scroll-btn left" onClick={() => scrollByPage(-1)} aria-label="Scroll left">‹</button>}
        <div className="card-list" ref={rowRef}>
        {items.map((it) => (
          <Link to={`/tv/${it.id}`} className="card" key={it.id}>
            <img
              src={it.backdrop_path ? 'https://image.tmdb.org/t/p/w500' + it.backdrop_path : 'https://via.placeholder.com/500x280?text=No+Image'}
              alt={it.name}
            />
            <p>{it.name}</p>
          </Link>
        ))}
        </div>
        {showRight && <button className="scroll-btn right" onClick={() => scrollByPage(1)} aria-label="Scroll right">›</button>}
      </div>
    </div>
  );
};

export default function SerieTv() {
  return (
    <div className="serie-page">
      <Navbar />

      <div className="serie-container">
        <TVRow title={"Popolari"} category={"popular"} />
        <TVRow title={"I più votati"} category={"top_rated"} />
        <TVRow title={"In onda (on the air)"} category={"on_the_air"} />
        <TVRow title={"In onda oggi"} category={"airing_today"} />
      </div>
    </div>
  );
}
