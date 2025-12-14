import { useStars } from "../../hooks/useStars";
import StarItem from "./StarItem";
import { useFavorites } from "../../hooks/useFavorites";

export default function StarsList() {
  const {
    loading,
    visibleStars,
    totalStars,

    // filter values
    searchQuery,
    spectralTypeFilter,
    constellationFilter,
    magnitudeFilter,

    // option lists
    spectralTypes,
    constellations,
    magnitudeOptions,

    // sorting
    sortBy,

    // setters
    setSearchQuery,
    setSpectralTypeFilter,
    setConstellationFilter,
    setMagnitudeFilter,
    setSortBy,

    // pagination + reset
    handleLoadMore,
    handleReset,
  } = useStars();

  const favorites = useFavorites();

  return (
    <div className="p-4 mt-20">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-green-300 drop-shadow">
        Browse Stars
      </h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search stars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded flex-1 text-black"
        />

        {/* Spectral Type Filter */}
        <select
          value={spectralTypeFilter ?? ""}
          onChange={(e) => setSpectralTypeFilter(e.target.value || null)}
          className="p-2 rounded flex-1 text-black"
        >
          <option value="">All Spectral Types</option>
          {spectralTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Constellation Filter */}
        <select
          value={constellationFilter ?? ""}
          onChange={(e) => setConstellationFilter(e.target.value || null)}
          className="p-2 rounded flex-1 text-black"
        >
          <option value="">All Constellations</option>
          {constellations.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Magnitude Filter */}
        <select
          value={magnitudeFilter ?? ""}
          onChange={(e) =>
            setMagnitudeFilter(
              e.target.value ? Number(e.target.value) : null
            )
          }
          className="p-2 rounded flex-1 text-black"
        >
          <option value="">All Magnitudes</option>
          {magnitudeOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Sorting */}
        <select
          value={sortBy ? `${sortBy.key}:${sortBy.direction}` : ""}
          onChange={(e) => {
            if (!e.target.value) return setSortBy(null);
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

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Reset
        </button>
      </div>

      {/* Star Count Text */}
      <div
        className="text-gray-300 text-sm mb-3 opacity-0 animate-fadeIn"
        style={{ animation: "fadeIn 0.6s forwards" }}
      >
        {totalStars.toLocaleString()}{" "}
        {totalStars === 1 ? "star" : "stars"} found
      </div>

      {/* Loading-Skeleton */}
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
          {/* Star Grid! */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {visibleStars.map((star) => (
              <StarItem key={star.id} star={star} favorites={favorites} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleStars.length < totalStars && (
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