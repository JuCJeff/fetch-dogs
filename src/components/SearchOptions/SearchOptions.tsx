import { BreedFilter } from "./BreedFilter";
import { LocationFilter } from "./LocationFilter";
import { SortOptions } from "./SortOptions";

import type { SortOption } from "@/types";

import "./SearchOptions.css";

interface SearchOptionsProps {
  selectedBreeds: string[];
  onBreedSelect: (breeds: string[]) => void;
  selectedSortOption: SortOption;
  onSortOptionChange: (option: SortOption) => void;
  city: string | undefined;
  setCity: (city: string) => void;
  state: string | undefined;
  setState: (state: string) => void;
  radius: string | undefined;
  setRadius: (radius: string | undefined) => void;
  onApplyFilter: (reset?: boolean) => void;
}

const SearchOptions = ({
  selectedBreeds,
  onBreedSelect,
  selectedSortOption,
  onSortOptionChange,
  city,
  setCity,
  state,
  setState,
  radius,
  setRadius,
  onApplyFilter,
}: SearchOptionsProps) => {
  return (
    <div>
      <div className="search-options">
        <BreedFilter
          selectedBreed={selectedBreeds}
          onBreedSelect={onBreedSelect}
        />
        <SortOptions
          selectedSortOption={selectedSortOption}
          onSortOptionChange={onSortOptionChange}
        />
        <LocationFilter
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          radius={radius}
          setRadius={setRadius}
          onFilter={onApplyFilter}
        />
      </div>
      <button
        onClick={() => {
          onBreedSelect([]);
          onSortOptionChange("breed:asc");
          setCity("");
          setState("");
          setRadius(undefined);
          onApplyFilter(true);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default SearchOptions;
