import React from "react";
import { fetchWikipediaSummary } from "../services/wikipedia";
import type { WikipediaSummary } from "../types/Wikipedia";

export function useWikipediaSummary(starName?: string) {
  const [data, setData] = React.useState<WikipediaSummary | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!starName) return;

    setLoading(true);
    setError(false);

    fetchWikipediaSummary(starName)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [starName]);

  return { data, loading, error };
}
