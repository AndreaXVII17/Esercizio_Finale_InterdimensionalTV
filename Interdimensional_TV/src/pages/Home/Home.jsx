
import React from "react";
import './Home.css' ;
import Navbar from "../../components/Navbar/NavBar";
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from "../../components/TitleCard/TitleCard";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className = 'Home'>
      <Navbar />

      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />

        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae tempora sint dignissimos?</p>

          <div className="hero-btns">
            <button className="btn"><img src={play_icon}alt="" />Play</button>
            <button className="btn dark-btn"><img src={info_icon}alt="" />More Info</button>
          </div>

          <TitleCards />

        </div>
      </div>

    <div className="more-cards">

      <TitleCards title={"Blockbuster"}/>
      <TitleCards title={"Only on netflix"}/>
      <TitleCards title={"in arrivo "}/>
      <TitleCards title={"for you"}/>

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
