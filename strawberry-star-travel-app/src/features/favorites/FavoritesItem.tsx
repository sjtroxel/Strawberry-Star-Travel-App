import React, { useState, useRef } from "react";
import type { Star } from "../stars/Star";
import StarDetailsModal from "../stars/StarDetailsModal";
import { useFavorites } from "../../hooks/useFavorites";
import { useWikipediaSummary } from "../stars/hooks/useWikipediaSummary";

interface FavoritesItemProps {
  star: Star;
}

export default function FavoritesItem({ star }: FavoritesItemProps) {
  const { removeFavorite } = useFavorites();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const wikiData = useWikipediaSummary(star);

  const displayName =
    star.name && star.name.trim() !== "" ? star.name : "Unnamed Star";

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFavorite(star.id);
  };

  const handleDetailsClick = () => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setAnchorRect(rect);
    setIsModalOpen(true);
  };

  const PARSEC_TO_LIGHTYEAR = 3.26156;
  const distanceInLy = star.distanceLy * PARSEC_TO_LIGHTYEAR;

  return (
    <>
      <div
        ref={cardRef}
        className="
          h-full flex flex-col
          bg-[#0a0612] backdrop-blur-xl 
          p-4 rounded-xl shadow-lg 
          border border-[#3a1f6b] 
          m-2 transform transition-transform duration-300
          hover:scale-[1.03]
          hover:shadow-[0_0_18px_rgba(174,102,255,0.45)]
          relative
        "
      >
        <h2
          className={
            star.name && star.name.trim() !== ""
              ? "text-2xl font-bold text-amber-100 mb-4 pb-2 drop-shadow-sm"
              : "text-2xl italic text-slate-300 pb-2 mb-4"
          }
        >
          {displayName}
        </h2>

        <ul className="text-[#c8b7ff] text-sm space-y-1 flex-1">
          <li>
            <span className="font-semibold text-[#a18be0]">Designation:</span>{" "}
            {star.designation}
          </li>
          <li>
            <span className="font-semibold text-[#a18be0]">Spectral Type:</span>{" "}
            {star.spectralType}
          </li>
          <li>
            <span className="font-semibold text-[#a18be0]">Distance:</span>{" "}
            {distanceInLy.toFixed(2)} ly ({star.distanceLy.toFixed(2)} pc)
          </li>
          <li>
            <span className="font-semibold text-[#a18be0]">Constellation:</span>{" "}
            {star.constellation}
          </li>
          <li>
            <span className="font-semibold text-[#a18be0]">Apparent Magnitude:</span>{" "}
            {star.apparentMagnitude}
          </li>

          {star.imageUrl && (
            <li className="mt-1">
              <img
                src={star.imageUrl}
                alt={displayName}
                className="w-full h-auto rounded-md border border-[#5e3fa8] shadow"
              />
            </li>
          )}
        </ul>

        <div className="mt-2 flex gap-2">
          <button
            onClick={handleDetailsClick}
            className="
              flex-1 px-3 py-2 rounded-lg
              bg-[#3a1f6b] hover:bg-[#4c1f7f]
              text-sm font-semibold text-[#f7e6ff]
              transition
            "
          >
            🔍 Details
          </button>

          <button
            onClick={handleRemoveClick}
            className="
              flex-1 px-3 py-2 rounded-lg
              bg-rose-700/80 hover:bg-rose-600/80
              text-sm font-semibold text-[#f7e6ff]
              transition
            "
          >
            💔 Remove
          </button>
        </div>
      </div>

      {isModalOpen && anchorRect && (
        <StarDetailsModal
          star={star}
          anchorRect={anchorRect}
          onClose={() => setIsModalOpen(false)}
          wikiData={wikiData}
        />
      )}
    </>
  );
}
