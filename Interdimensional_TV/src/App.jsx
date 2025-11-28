import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults";
import Favourites from "./pages/Favourites";  // <--- IMPORT GIUSTO
import { FavouritesProvider } from "./context/FavouritesContext";

function App() {
  return (
    <FavouritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favourites" element={<Favourites />} />  {/* <--- QUI NON DEVE CRASHARE */}
      </Routes>
    </FavouritesProvider>
  );
}

export default App;
