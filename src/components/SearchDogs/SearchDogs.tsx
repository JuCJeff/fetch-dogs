import { useState, useEffect } from "react";

import { fetchDogs } from "../../services";

import { LogoutButton } from "../Authentication";
import { Tabs } from "../Tabs";
import { AllDogsTab } from "../Tabs/AllDogsTab";
import { FavoriteDogsTab } from "../Tabs/FavoriteDogsTab";

import { useFavorites } from "../../context/FavoritesContext";

import type { Dog, SortOption } from "../../types";

import "./SearchDogs.css";

const PAGE_SIZE = 25; // Number of dogs per page

const SearchDogs = () => {
  // Tab states
  const [activeTab, setActiveTab] = useState<string>("all");

  // Dog states
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOption>("breed:asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDogs, setTotalDogs] = useState<number>(0);

  // Loading states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { toggleFavorite } = useFavorites();

  useEffect(() => {
    if (activeTab === "favorites") return;

    const loadDogs = async () => {
      setLoading(true);

      try {
        const { dogs, total } = await fetchDogs({
          size: PAGE_SIZE,
          from: (currentPage - 1) * PAGE_SIZE,
          breeds: selectedBreeds || undefined,
          sort: selectedSortOption,
        });

        console.log(dogs);

        setDogs(dogs);
        setTotalDogs(total);
      } catch (err) {
        setError(`Failed to load dogs: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, [currentPage, activeTab, selectedBreeds, selectedSortOption]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Search for dogs</h1>

      {/* Tabs to switch between All Dogs and Favorite Dogs */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "all" && (
        <AllDogsTab
          dogs={dogs}
          totalDogs={totalDogs}
          selectedBreeds={selectedBreeds}
          onBreedSelect={setSelectedBreeds}
          selectedSortOption={selectedSortOption}
          onSortOptionChange={setSelectedSortOption}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {activeTab === "favorites" && (
        <FavoriteDogsTab onFavoriteClick={toggleFavorite} />
      )}

      <LogoutButton />
    </div>
  );
};

export default SearchDogs;
