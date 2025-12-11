import React from "react";
import type { Star } from "../features/stars/Star";

export function useFavorites() {
  // State for favorites
  const [favorites, setFavorites] = React.useState<Star[]>([]);
  const [loading, setLoading] = React.useState(false);

  // ---------- FUNCTIONS ----------
  
  const addFavorite = (star: Star) => {
    // Placeholder: update state for now
    setLoading(true);
    setFavorites(prev => [...prev, star]);
    console.log("Add to favorites called for", star.name);
    setLoading(false);
  };

  const removeFavorite = (starId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== starId));
    console.log("Remove from favorites called for", starId);
  };

  const isFavorite = (starId: number) => {
    return favorites.some(fav => fav.id === starId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}