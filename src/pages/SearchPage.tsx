import { useState } from "react";

import { AllDogsTab, FavoriteDogsTab, Tabs } from "../components/Tabs";
import { LogoutButton } from "../components/Authentication";
import { useFavorites } from "../hooks";

import "./SearchPage.css";

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toggleFavorite } = useFavorites();

  return (
    <div>
      <div className="sticky-header">
        <h1>Search for dogs</h1>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <span className="logout-btn">
          <LogoutButton />
        </span>
      </div>

      {activeTab === "all" && <AllDogsTab />}
      {activeTab === "favorites" && (
        <FavoriteDogsTab onFavoriteClick={toggleFavorite} />
      )}
    </div>
  );
}
