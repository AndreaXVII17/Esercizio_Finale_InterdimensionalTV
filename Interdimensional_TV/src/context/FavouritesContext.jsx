import { createContext, useEffect, useState } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Carica da localStorage al primo avvio
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(saved);
  }, []);

  // Salva ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (item) => {
    if (!favourites.some(f => f.id === item.id)) {
      setFavourites([...favourites, item]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(f => f.id !== id));
  };

  const isFavourite = (id) => {
    return favourites.some(f => f.id === id);
  };

  return (
    <FavouritesContext.Provider value={{
      favourites,
      addFavourite,
      removeFavourite,
      isFavourite
    }}>
      {children}
    </FavouritesContext.Provider>
  );
};
