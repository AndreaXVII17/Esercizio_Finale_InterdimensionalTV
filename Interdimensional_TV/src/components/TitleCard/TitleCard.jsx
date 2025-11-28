
import React, { useEffect, useRef, useState } from "react";
import './TitleCard.css' ;
import cards_data from '../../assets/cards/Cards_data';
import { Link } from "react-router-dom";





const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]); 
  const cardsRef= useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZjNTMyZmI2NDFkNjM3NTgzZGZmNjZjNjdmMTM4NCIsIm5iZiI6MTc2Mjc4NTc4Ni44NzUsInN1YiI6IjY5MTFmOWZhZmUwOGI2NzcyNmEwY2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYx1ffbNPqHam0JWdpJcYy9moHha62AY0MjVgeX5nn8'
  }
};



const [showLeft, setShowLeft] = useState(false);
const [showRight, setShowRight] = useState(false);

useEffect(()=>{

  fetch( `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res =>setApiData(res.results))
  .catch(err => console.error(err));

  const el = cardsRef.current;
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

},[category])

const scrollByPage = (dir = 1) => {
  const el = cardsRef.current;
  if (!el) return;
  const amount = el.clientWidth;
  el.scrollBy({ left: dir * amount, behavior: 'smooth' });
};


  return (
    <div className = 'title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>

      <div className="row-wrapper">
        {showLeft && (
          <button className="scroll-btn left" onClick={() => scrollByPage(-1)} aria-label="Scroll left">‹</button>
        )}

        <div className="card-list" ref={cardsRef}>

          {apiData.map((card, index) =>{
           return (
  <Link to={`/movie/${card.id}`} className="card" key={index}>
    <img src={'https://image.tmdb.org/t/p/w500' + card.backdrop_path} alt="" />
    <p>{card.original_title || card.name}</p>
  </Link>
);

        })} 

         </div>

         {showRight && (
           <button className="scroll-btn right" onClick={() => scrollByPage(1)} aria-label="Scroll right">›</button>
         )}
      </div>
    </div>
  )
}
export default TitleCards