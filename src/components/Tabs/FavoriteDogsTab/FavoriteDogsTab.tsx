import { useState, useEffect } from "react";

import { DogCard } from "../../../components/DogCard";
import MatchingDog from "./MatchingDog";
import { getDogDetailsBasedOnId, getMatchingDog } from "../../../services";
import { useFavorites } from "../../../hooks";

import type { Dog } from "@/types";

import "./MatchingDog.css";

interface FavoriteDogsTabProps {
  onFavoriteClick: (dogId: string) => void;
}

const FavoriteDogsTab = ({ onFavoriteClick }: FavoriteDogsTabProps) => {
  const { favorites } = useFavorites();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchingDog, setMatchingDog] = useState<Dog | null>(null);

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

  const handleDogMatch = async () => {
    const dogIds = favoriteDogs.map((dog) => dog.id);

    try {
      const matchingDogResponse = await getMatchingDog(dogIds);
      setMatchingDog(matchingDogResponse);
    } catch (err) {
      console.log("Failed to get matching dog:", err);
    }
  };

  return (
    <div>
      <h2>Favorite Dogs</h2>
      {favoriteDogs.length === 0 ? (
        <p>No favorites yet! ❤️</p>
      ) : (
        <>
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
          <button onClick={handleDogMatch}>Get Matching Dog</button>

          {matchingDog && (
            <div className="matching-dog-container">
              <h3>Matched Dog</h3>
              <MatchingDog dog={matchingDog} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteDogsTab;
