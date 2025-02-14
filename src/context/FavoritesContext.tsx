import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type FavoriteContextType = {
  favorites: Set<string>;
  toggleFavorite: (dogId: string) => void;
};

const FavoritesContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(new Set(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (dogId: string) => {
    setFavorites((favorites) => {
      const favoritesCopy = new Set(favorites);
      if (favoritesCopy.has(dogId)) {
        favoritesCopy.delete(dogId);
      } else {
        favoritesCopy.add(dogId);
      }
      return favoritesCopy;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
