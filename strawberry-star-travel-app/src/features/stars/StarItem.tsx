import React from "react";
import type { Star } from "./Star";
import StarDetailsModal from "./StarDetailsModal";

interface StarItemProps {
  star: Star;
  favorites: {
    addFavorite: (star: Star) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    loading: boolean;
    favorites: number[];
  };
}

function StarItem({ star, favorites }: StarItemProps) {
  const { addFavorite, removeFavorite, isFavorite } = favorites;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const displayName =
    star.name && star.name.trim() !== "" ? star.name : "unnamed star";

  // ★ Rose-colored name, darker + bolder
  const nameClasses =
    star.name && star.name.trim() !== ""
      ? "text-2xl font-extrabold text-emerald-400 mb-4 pb-2 drop-shadow-sm"
      : "text-2xl italic text-slate-400 pb-2 mb-4";

  const PARSEC_TO_LIGHTYEAR = 3.26156;
  const distanceInLightYears = star.distanceLy * PARSEC_TO_LIGHTYEAR;

  const handleFavoriteClick = () => {
    if (isFavorite(star.id)) removeFavorite(star.id);
    else addFavorite(star);
  };

  return (
    <>
      <div
        className="
          h-full flex flex-col
          bg-white/25 backdrop-blur-xl
          p-4 rounded-xl shadow-lg border border-blue-900/40
          m-2 transform transition-transform duration-300
          hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(0,180,255,0.45)]
        "
      >
        {/* Star Name */}
        <h2 className={nameClasses}>{displayName}</h2>

        {/* Details */}
        <ul className="text-slate-200 text-sm space-y-1 flex-1">
          <li>
            <span className="font-semibold text-slate-300">Designation:</span>{" "}
            <span className="text-slate-100">{star.designation}</span>
          </li>

          <li>
            <span className="font-semibold text-slate-300">Spectral Type:</span>{" "}
            <span className="text-slate-100">{star.spectralType}</span>
          </li>

          <li>
            <span className="font-semibold text-slate-300">Distance:</span>{" "}
            <span className="text-slate-100">
              {distanceInLightYears.toFixed(2)} light-years
            </span>
            <span className="text-xs opacity-60">
              {" "}
              ({star.distanceLy.toFixed(2)} pc)
            </span>
          </li>

          <li>
            <span className="font-semibold text-slate-300">Constellation:</span>{" "}
            <span className="text-slate-100">{star.constellation}</span>
          </li>

          <li className="mb-2">
            <span className="font-semibold text-slate-300">
              Apparent Magnitude:
            </span>{" "}
            <span className="text-slate-100">{star.apparentMagnitude}</span>
          </li>

          {star.imageUrl && (
            <li className="mt-1">
              <img
                src={star.imageUrl}
                alt={`Image of ${displayName}`}
                className="
                  w-full h-auto rounded-md
                  border border-blue-700/40 shadow
                "
              />
            </li>
          )}
        </ul>

        {/* Action Buttons */}
        <div className="mt-0 flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="
              flex-1 px-3 py-2 rounded-lg bg-blue-900/80 hover:bg-blue-800
              text-sm font-semibold text-slate-100 transition
            "
          >
            🔍 Details
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`
              flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition
              ${
                isFavorite(star.id)
                  ? "bg-rose-700/80 hover:bg-rose-600/80 text-white"
                  : "bg-blue-950/80 hover:bg-blue-900/80 text-rose-200"
              }
            `}
          >
            {isFavorite(star.id) ? "💔 Remove" : "💖 Save"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <StarDetailsModal star={star} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default StarItem;