import { stars } from "../data/stars";
import type { Star } from "../types/Star";
import StarItem from "./StarItem";

function StarsList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 auto-rows-fr">
      {stars.map((star: Star) => (
        <StarItem key={star.id} star={star} />
      ))}
    </div>
  );
}

export default StarsList;
