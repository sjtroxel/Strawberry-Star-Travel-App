import React from "react";
import { stars } from "../data/stars";
import type { Star } from "../types/Star";
import StarItem from "./StarItem";
import Fuse from "fuse.js";

// Fuse.js setup for fuzzy search
const fuse = new Fuse(stars, {
  keys: ["name", "designation", "spectralType", "constellation"],
  threshold: 0.4, // adjust for sensitivity
});

function StarsList() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredStars, setFilteredStars] = React.useState<Star[]>(stars);
  const [sortBy, setSortBy] = React.useState<"distanceLy" | "apparentMagnitude" | "name" | "spectralType" | null>(null);
  const [filterByType, setFilterByType] = React.useState<string | null>(null);

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

    setFilteredStars(updatedStars);
  }, [searchQuery, filterByType, sortBy]);

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
      </div>

      {/* Star grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {filteredStars.map((star: Star) => (
          <StarItem key={star.id} star={star} />
        ))}
      </div>
    </div>
  );
}

export default StarsList;
