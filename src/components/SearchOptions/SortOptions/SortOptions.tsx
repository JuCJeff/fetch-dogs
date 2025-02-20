import type { SortOption } from "@/types";

import "./SortOptions.css";

interface SortOptionProps {
  selectedSortOption: string;
  onSortOptionChange: (sort: SortOption) => void;
}

const SORT_OPTIONS = [
  { param: "breed:asc", name: "Breed A-Z" },
  { param: "breed:desc", name: "Breed Z-A" },
  { param: "name:asc", name: "Name A-Z" },
  { param: "name:desc", name: "Name Z-A" },
  { param: "age:asc", name: "Youngest to Oldest" },
  { param: "age:desc", name: "Oldest to Youngest" },
];

const SortOptions = ({
  selectedSortOption,
  onSortOptionChange,
}: SortOptionProps) => {
  return (
    <div className="sort-options-container">
      <label htmlFor="sort-options">Sort Options </label>
      <select
        id="sort-options"
        value={selectedSortOption}
        onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map(({ param, name }) => (
          <option key={param} value={param}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOptions;
