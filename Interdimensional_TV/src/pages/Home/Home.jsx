
import React from "react";
import './Home.css' ;
import Navbar from "../../components/Navbar/NavBar";
import info_icon from '../../assets/info_icon.png';
import TitleCards from "../../components/TitleCard/TitleCard";
import Footer from "../../components/Footer/Footer";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HeroBannerFoto from "../../components/HeroBanner/HeroBannerFoto";

const Home = () => {
  return (
    <div className = 'Home'>
      <Navbar />
      <HeroBannerFoto/>

    <div className="more-cards">

      <TitleCards title={"Piu votati"} category={"top_rated"}/>
      <TitleCards title={"Popolari"} category={"popular"}/>
      <TitleCards title={"In Arrivo "} category={"upcoming"}/>
      <TitleCards title={"Per Te"} category={"now_playing"}/>

    </div>

    <Footer />

    </div>
  )
}
export default Home
















// import { useEffect, useState } from "react";
// import Row from "../components/Row";

// import {
//   getPopularMovies,
//   getTopRatedMovies,
//   getUpcomingMovies,
//   getMoviesByGenre
// } from "../api/tmdb.js";


// export default function Home() {
//   const [popular, setPopular] = useState([]);
//   const [topRated, setTopRated] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);
//   const [action, setAction] = useState([]);

//   useEffect(() => {
//     getPopularMovies().then(data => setPopular(data.results));
//     getTopRatedMovies().then(data => setTopRated(data.results));
//     getUpcomingMovies().then(data => setUpcoming(data.results));
//     getMoviesByGenre(28).then(data => setAction(data.results)); // 28 = Action
//   }, []);

//   return (
//     <div className="home">
//       <Row title="I più popolari" movies={popular} />
//       <Row title="I più votati" movies={topRated} />
//       <Row title="Prossimamente" movies={upcoming} />
//       <Row title="Azione" movies={action} />
//     </div>
//   );
// }
