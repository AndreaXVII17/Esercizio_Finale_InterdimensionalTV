import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults";
import Favourites from "./pages/Favourites";
import { FavouritesProvider } from "./context/FavouritesContext";
import Layout from "./layout";    // 👈 importa il layout


function App() {
  return (
    <FavouritesProvider>
      <Routes>


        {/* Layout che contiene Navbar */}
        <Route element={<Layout />}>


          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favourites" element={<Favourites />} />


        </Route>


      </Routes>
    </FavouritesProvider>
  );
}


export default App;
