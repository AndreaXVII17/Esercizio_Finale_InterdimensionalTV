import { useEffect, useState } from "react";
import Row from "../components/Row";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMoviesByGenre
} from "../api/tmdb.js";


export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [action, setAction] = useState([]);

  useEffect(() => {
    getPopularMovies().then(data => setPopular(data.results));
    getTopRatedMovies().then(data => setTopRated(data.results));
    getUpcomingMovies().then(data => setUpcoming(data.results));
    getMoviesByGenre(28).then(data => setAction(data.results)); // 28 = Action
  }, []);

  return (
    <div className="home">
      <Row title="I più popolari" movies={popular} />
      <Row title="I più votati" movies={topRated} />
      <Row title="Prossimamente" movies={upcoming} />
      <Row title="Azione" movies={action} />
    </div>
  );
}
