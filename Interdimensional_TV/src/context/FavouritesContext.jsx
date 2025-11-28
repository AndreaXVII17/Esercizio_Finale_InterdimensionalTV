import { createContext, useEffect, useState } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    //  Legge SOLO al primo avvio
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  //  Salva solo quando favourites cambia
  useEffect(() => {
    if (favourites.length > 0) {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }, [favourites]);

  const addFavourite = (item) => {
    setFavourites((prev) => {
      // evita duplicati
      if (prev.some((f) => f.id === item.id)) return prev;
      const updated = [...prev, item];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavourite = (id) => favourites.some((f) => f.id === id);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
