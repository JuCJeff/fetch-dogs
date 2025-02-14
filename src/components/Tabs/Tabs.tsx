interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "all" ? "active" : ""}
        onClick={() => onTabChange("all")}
      >
        All Dogs
      </button>
      <button
        className={activeTab === "favorites" ? "active" : ""}
        onClick={() => onTabChange("favorites")}
      >
        Favorite Dogs ❤️
      </button>
    </div>
  );
};

export default Tabs;
