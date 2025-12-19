import React from "react";
import type { Star } from "../stars/Star";
import StarDetailsModal from "../stars/StarDetailsModal";
import { useFavorites } from "../../hooks/useFavorites";
import { useWikipediaSummary } from "../stars/hooks/useWikipediaSummary";

interface FavoritesItemProps {
  star: Star;
}

export default function FavoritesItem({ star }: FavoritesItemProps) {
  const { removeFavorite } = useFavorites();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [anchorRect, setAnchorRect] = React.useState<DOMRect | null>(null);

  const cardRef = React.useRef<HTMLDivElement>(null);

  // Same hook StarItem uses
  const wikiData = useWikipediaSummary(star);

  function openModal() {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setAnchorRect(rect);
    }
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div
        ref={cardRef}
        onClick={openModal}
        className="
          relative cursor-pointer rounded-xl p-4 shadow-lg transition-all

          /* Electric-Violet Storm Theme */
          bg-[#0a0612] border border-[#3a1f6b]
          hover:border-[#a35cff] hover:shadow-[0_0_12px_#ae66ff]
          hover:bg-[#12091f]
        "
      >
        <h3 className="text-lg font-bold text-[#d7b7ff] tracking-wide">
          {star.name}
        </h3>

        <p className="text-sm text-[#9d84cc] mt-1">
          {star.designation}
        </p>

        <p className="text-xs text-[#7f6cae] mt-2 italic">
          {star.spectralType} • {star.constellation}
        </p>

        {/* Remove from favorites */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFavorite(star.id);
          }}
          className="
            absolute top-3 right-3 px-2 py-1 text-xs rounded-md
            bg-[#4c1f7f] text-[#f7e6ff]
            hover:bg-[#6b2bb1] hover:shadow-[0_0_10px_#ae66ff]
            transition-all
          "
        >
          Remove
        </button>
      </div>

      {/* Only render when both are valid */}
      {isModalOpen && anchorRect && (
        <StarDetailsModal
          star={star}
          onClose={closeModal}
          anchorRect={anchorRect}
          wikiData={wikiData}
        />
      )}
    </>
  );
}