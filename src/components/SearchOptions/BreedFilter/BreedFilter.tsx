import { useEffect, useState } from "react";

import { getDogBreeds } from "../../../services";

import "./BreedFilter.css";

interface BreedFilterProps {
  selectedBreed: string[];
  onBreedSelect: (SelectedBreed: string[]) => void;
}

const BreedFilter = ({ selectedBreed, onBreedSelect }: BreedFilterProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreedList = async () => {
      const breeds = await getDogBreeds();

      setBreeds(breeds as string[]);
    };

    fetchBreedList();
  }, []);

  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = event.target.value === "" ? "" : event.target.value;
    onBreedSelect(breed ? [breed] : []);
  };

  return (
    <div className="breed-filter">
      <label htmlFor="breed-select">Breed filter: </label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={handleBreedChange}
      >
        <option key={"all-breeds"} value="">
          All Breeds
        </option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedFilter;
