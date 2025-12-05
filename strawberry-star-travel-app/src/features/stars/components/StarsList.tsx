import { stars } from "../data/stars";
import type { Star } from "../types/Star";
import StarItem from "./StarItem"

function StarsList() {
  return (
    <ul>
      {stars.map((star: Star) => (
        <StarItem key={star.id} star={star} />
      ))}
    </ul>
  );
}

export default StarsList;