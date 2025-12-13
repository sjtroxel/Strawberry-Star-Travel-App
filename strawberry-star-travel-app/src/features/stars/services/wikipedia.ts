const WIKIPEDIA_API =
  "https://en.wikipedia.org/api/rest_v1/page/summary";

export async function fetchWikipediaSummary(title: string) {
  const response = await fetch(
    `${WIKIPEDIA_API}/${encodeURIComponent(title)}`
  );

  if (!response.ok) {
    throw new Error("Wikipedia page not found");
  }

  return response.json();
}
