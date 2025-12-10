import React from "react";
import type { Star } from "./Star";
import StarItem from "./StarItem";
import rawStars from "./data/stars.json"
import Fuse from "fuse.js";

// Typed stars array
const stars: Star[] = rawStars as Star[]

// Fuse.js setup for fuzzy search
const fuse = new Fuse(stars, {
  keys: ["name", "designation", "spectralType", "constellation"],
  threshold: 0.4, // adjust for sensitivity
});

function StarsList() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredStars, setFilteredStars] = React.useState<Star[]>([]);
  const [visibleStars, setVisibleStars] = React.useState<Star[]>([]);
  const [sortBy, setSortBy] = React.useState<"distanceLy" | "apparentMagnitude" | "name" | "spectralType" | null>(null);
  const [filterByType, setFilterByType] = React.useState<string | null>(null);
  const [starsToShow, setStarsToShow] = React.useState(50);
  const [loading, setLoading] = React.useState(true);

  // Turn off loading after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
    }, []); 

  // Dynamically get all spectral types from stars
  const spectralTypes = Array.from(new Set(stars.map(star => star.spectralType))).sort();

  React.useEffect(() => {
    let updatedStars = [...stars];

    // Filter by spectral type
    if (filterByType) {
      updatedStars = updatedStars.filter(star => star.spectralType === filterByType);
    }

    // Fuzzy search
    if (searchQuery) {
      const fuseResults = fuse.search(searchQuery);
      updatedStars = fuseResults.map(result => result.item);
    }

    // Sort
    if (sortBy) {
      updatedStars.sort((a, b) => {
        const aVal = a[sortBy] ?? 0;
        const bVal = b[sortBy] ?? 0;
        if (typeof aVal === "string" && typeof bVal === "string") {
          return aVal.localeCompare(bVal);
        }
        return (aVal as number) - (bVal as number);
      });
    }

    // Push unnamed stars to the end
    updatedStars.sort((a, b) => {
      const aHasName = a.name && a.name.trim() !== "";
      const bHasName = b.name && b.name.trim() !== "";
      return (aHasName === bHasName) ? 0 : aHasName ? -1 : 1;
    });

    setFilteredStars(updatedStars);
    // Slice for pagination
    setVisibleStars(updatedStars.slice(0, starsToShow)); // lazy load
  }, [searchQuery, filterByType, sortBy, starsToShow]);

  const handleLoadMore = () => {
    setStarsToShow(prev => prev + 50);
  }

  const handleReset = () => {
    setSearchQuery("");
    setFilterByType(null);
    setSortBy(null);
    setStarsToShow(50);
  }

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search stars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded flex-1 text-black"
        />

        <select
          value={filterByType ?? ""}
          onChange={(e) => setFilterByType(e.target.value || null)}
          className="p-2 rounded flex-1 text-black"
        >
          <option value="">All Types</option>
          {spectralTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={sortBy ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value as "distanceLy" | "apparentMagnitude" | "name" | "spectralType" | "";
            setSortBy(value || null);
          }}
          className="p-2 rounded flex-1 text-black"
        >
          <option value="">No Sorting</option>
          <option value="distanceLy">Distance</option>
          <option value="apparentMagnitude">Brightness</option>
          <option value="name">Name</option>
          <option value="spectralType">Spectral Type</option>
        </select>

      {/* Reset button */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Reset
        </button>
      </div>

      {/* Star Count */}
      <div
        className="text-gray-300 text-sm mb-3 opacity-0 animate-fadeIn"
        style={{ animation: "fadeIn 0.6s forwards" }}
      >
        {filteredStars.length.toLocaleString()}{" "}
        {filteredStars.length === 1 ? "star" : "stars"} found
      </div>

      {/* Skeleton Loading State */}
        {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-700 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      ) : (
        <>
      {/* Star grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {visibleStars.map((star: Star) => (
          <StarItem key={star.id} star={star} />
        ))}
      </div>

      {/* Load More button */}
      {visibleStars.length < filteredStars.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Load More
          </button>
        </div>
      )}
      </>
      )}      
    </div>
  );
}

export default StarsList;