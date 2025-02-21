import type { Dog } from "../../types";

import "./DogCard.css";

interface DogCardProps {
  dog: Dog;
  onFavoriteClick?: (id: string) => void;
  isFavorite?: boolean;
}

const DogCard = ({ dog, onFavoriteClick, isFavorite }: DogCardProps) => {
  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <div className="dog-info">
        <h2>{dog.name}</h2>
        <p>
          <strong>Breed:</strong> {dog.breed}
        </p>
        <p>
          <strong>Age:</strong> {dog.age} years
        </p>
        <p>
          <strong>Location:</strong> ZIP {dog.zip_code}
        </p>

        <button
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={() => (onFavoriteClick ? onFavoriteClick(dog.id) : {})}
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
    </div>
  );
};

export default DogCard;
