import { useFavorites } from "../../../context/FavoritesContext";

import { BreedFilter, SortOptions } from "../../SearchOptions";
import { DogCard } from "../../DogCard";
import { Pagination } from "../Pagination";

import type { Dog, SortOption } from "../../../types";

const PAGE_SIZE = 25; // Number of dogs per page

interface AllDogsTabProps {
  dogs: Dog[];
  totalDogs: number;
  selectedBreeds: string[];
  onBreedSelect: (breeds: string[]) => void;
  selectedSortOption: SortOption;
  onSortOptionChange: (option: SortOption) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const AllDogsTab = ({
  dogs,
  totalDogs,
  selectedBreeds,
  onBreedSelect,
  selectedSortOption,
  onSortOptionChange,
  currentPage,
  onPageChange,
}: AllDogsTabProps) => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <>
      <div className="search-options">
        <BreedFilter
          selectedBreed={selectedBreeds}
          onBreedSelect={onBreedSelect}
        />
        <SortOptions
          selectedSortOption={selectedSortOption}
          onSortOptionChange={onSortOptionChange}
        />

        <button onClick={() => onBreedSelect([])}>Reset Breed Filter</button>
      </div>
      <div className="dog-list">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.has(dog.id)}
            onFavoriteClick={toggleFavorite}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalDogs / PAGE_SIZE)}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default AllDogsTab;
