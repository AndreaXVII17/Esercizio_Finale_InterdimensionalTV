import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TV from "./pages/TV";
import Detail from "./pages/Detail";
import SearchResults from "./pages/SearchResults";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<TV />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
