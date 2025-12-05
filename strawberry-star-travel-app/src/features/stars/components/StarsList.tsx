import { stars } from "../data/stars";
import type { Star } from "../types/Star";

function StarsList() {
  return (
    <ul>
      {stars.map((star: Star) => (
        <li key={star.id}>
          {star.name} — {star.distanceLy.toFixed(2)} light-years away
        </li>
      ))}
    </ul>
  );
}

export default StarsList;