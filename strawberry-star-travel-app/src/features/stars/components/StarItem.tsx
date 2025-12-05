import type { Star } from "../types/Star"

interface StarItemProps {
    star: Star;
}

function StarItem ({ star }: StarItemProps) {
    return (
        <li>
            {star.name} - {star.distanceLy.toFixed(2)} light-years away
        </li>
    );
}

export default StarItem;