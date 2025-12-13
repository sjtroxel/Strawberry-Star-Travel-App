export interface WikipediaSummary {
  title: string;
  extract: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
}