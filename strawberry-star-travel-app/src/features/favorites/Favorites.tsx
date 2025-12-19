import React from "react";
import type { Star } from "../stars/Star";
import { useFavorites } from "../../hooks/useFavorites";
import StarItem from "../stars/StarItem";
import starsDataJson from "../stars/data/stars.json";

export default function Favorites() {
  const { favorites, loading, addFavorite, removeFavorite, isFavorite } =
    useFavorites();

  const stars: Star[] = starsDataJson as Star[];

  const [searchQuery, setSearchQuery] = React.useState("");
  const [spectralTypeFilter, setSpectralTypeFilter] =
    React.useState<string | null>(null);

  const [sortBy, setSortBy] = React.useState<{
    key: "distanceLy" | "apparentMagnitude" | "name" | "spectralType";
    direction: "asc" | "desc";
  } | null>(null);

  // Pagination state
  const [visibleCount, setVisibleCount] = React.useState(10);

  if (loading) {
    return (
      <div className="p-8 mt-24 text-center opacity-80">
        <p>Loading your favorite stars...</p>
      </div>
    );
  }

  // Convert favorite IDs → Star objects
  const favoriteStars = stars.filter((star) => favorites.includes(star.id));

  // Apply Filters & Sort
  let filtered = favoriteStars
    .filter((star) =>
      star.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (star) => !spectralTypeFilter || star.spectralType === spectralTypeFilter
    );

  // Replace `.toSorted` with safe TS version
  if (sortBy) {
  const key = sortBy.key;
  const direction = sortBy.direction;

  filtered = [...filtered].sort((a: Star, b: Star) => {
    const aVal = a[key]!;
    const bVal = b[key]!;

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}


  // Pagination (10 at a time)
  const visibleFavorites = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };


  // Unique lists for filters
  const spectralTypes = Array.from(
    new Set(favoriteStars.map((s) => s.spectralType))
  ).sort();

  return (
    <div className="p-8 mt-24min-h-screen bg-linear-to-b from-[#1c0f2e] to-[#2a1a47]">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 mt-24 text-pink-300 drop-shadow">
        Your Favorite Stars
      </h1>

      {favoriteStars.length === 0 ? (
        <p className="opacity-70 text-gray-300">
          You have no favorite stars yet.
        </p>
      ) : (
        <>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded flex-1 text-black"
            />

            {/* Spectral Type Filter */}
            <select
              value={spectralTypeFilter ?? ""}
              onChange={(e) =>
                setSpectralTypeFilter(e.target.value || null)
              }
              className="p-2 rounded flex-1 text-black"
            >
              <option value="">All Spectral Types</option>
              {spectralTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select
              value={sortBy ? `${sortBy.key}:${sortBy.direction}` : ""}
              onChange={(e) => {
                if (!e.target.value) {
                  setSortBy(null);
                  return;
                }
                const [key, direction] = e.target.value.split(":") as [
                  "distanceLy" | "apparentMagnitude" | "name" | "spectralType",
                  "asc" | "desc"
                ];
                setSortBy({ key, direction });
              }}
              className="p-2 rounded flex-1 text-black"
            >
              <option value="">No Sorting</option>
              <option value="distanceLy:asc">Distance ↑</option>
              <option value="distanceLy:desc">Distance ↓</option>
              <option value="apparentMagnitude:asc">Brightness ↑</option>
              <option value="apparentMagnitude:desc">Brightness ↓</option>
              <option value="name:asc">Name A–Z</option>
              <option value="name:desc">Name Z–A</option>
              <option value="spectralType:asc">Spectral Type A–Z</option>
              <option value="spectralType:desc">Spectral Type Z–A</option>
            </select>
          </div>

          {/* Star Count */}
          <div className="text-gray-300 text-sm mb-3 opacity-80">
            {filtered.length.toLocaleString()} favorite{" "}
            {filtered.length === 1 ? "star" : "stars"} found
          </div>

          {/* Star Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {visibleFavorites.map((star) => (
              <StarItem
                key={star.id}
                star={star}
                favorites={{
                  addFavorite,
                  removeFavorite,
                  isFavorite,
                  favorites,
                  loading,
                }}
              />
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 rounded bg-purple-700 hover:bg-purple-800 text-white shadow-md"
              >
                Load More Favorites
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
