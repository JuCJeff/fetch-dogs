import { useState, useEffect } from "react";

import { DogCard } from "../../../components/DogCard";
import { getDogDetailsBasedOnId } from "../../../services";
import { useFavorites } from "../../../context/FavoritesContext";

import type { Dog } from "../../../types";

interface FavoriteDogsTabProps {
  onFavoriteClick: (dogId: string) => void;
}

const FavoriteDogsTab = ({ onFavoriteClick }: FavoriteDogsTabProps) => {
  const { favorites } = useFavorites();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.size === 0) {
        setFavoriteDogs([]);
        return;
      }

      try {
        const dogs = await getDogDetailsBasedOnId(Array.from(favorites));
        setFavoriteDogs(dogs);
      } catch (err) {
        console.error("Failed to load favorite dogs:", err);
      }
    };

    loadFavorites();
  }, [favorites]);

  return (
    <div>
      <h2>Favorite Dogs</h2>
      {favoriteDogs.length === 0 ? (
        <p>No favorites yet! ❤️</p>
      ) : (
        <div className="dog-list">
          {favoriteDogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              isFavorite={true}
              onFavoriteClick={onFavoriteClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteDogsTab;
