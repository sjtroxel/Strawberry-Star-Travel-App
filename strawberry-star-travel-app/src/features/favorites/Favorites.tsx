import type { Star } from "../stars/Star";
import { useFavorites } from "../../hooks/useFavorites";
import StarItem from "../stars/StarItem";
import starsDataJson from "../stars/data/stars.json";

export default function Favorites() {
  const { favorites, loading, addFavorite, removeFavorite, isFavorite } =
    useFavorites();

  const stars: Star[] = starsDataJson as Star[];
  const starsLoading = false; // JSON already loaded

  if (loading || starsLoading) {
    return (
      <div className="p-4 text-center opacity-80">
        <p>Loading your favorite stars...</p>
      </div>
    );
  }

  const favoriteStars = stars.filter((star: Star) => favorites.includes(star.id));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Stars</h1>

      {favoriteStars.length === 0 ? (
        <p className="opacity-70">You have no favorite stars yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteStars.map((star: Star) => (
            <StarItem
              key={star.id}
              star={star}
              favorites={{ addFavorite, removeFavorite, isFavorite, favorites, loading }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
