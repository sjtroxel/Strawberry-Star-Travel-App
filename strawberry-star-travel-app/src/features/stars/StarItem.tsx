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

    const displayName = star.name && star.name.trim() !== "" ? star.name : "unnamed star";
    const nameClasses =
        star.name && star.name.trim() !== ""
            ? "text-xl font-bold text-yellow-300 mb-2"
            : "text-xl italic text-gray-400 mb-2";

    const handleFavoriteClick = () => {
        if (isFavorite(star.id)) removeFavorite(star.id);
        else addFavorite(star);
    };

    return (
      <>  
        <div className="h-full flex flex-col bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-700 m-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className={nameClasses}>{displayName}</h2>
            <ul className="text-gray-200 text-sm space-y-1 flex-1">
                <li><span className="font-semibold">Designation:</span> {star.designation}</li>
                <li><span className="font-semibold">Spectral Type:</span> {star.spectralType}</li>
                <li><span className="font-semibold">Distance:</span> {star.distanceLy.toFixed(2)} light-years</li>
                <li><span className="font-semibold">Constellation:</span> {star.constellation}</li>
                <li><span className="font-semibold">Apparent Magnitude:</span> {star.apparentMagnitude}</li>
                {star.imageUrl && (
                    <li className="mt-2">
                        <img 
                            src={star.imageUrl} 
                            alt={`Image of ${star.name}`} 
                            className="w-full h-auto rounded-md border border-gray-600"
                        />
                    </li>
                )}
            </ul>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          {/* Details */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-semibold text-gray-200"
          >
            🔍 Details
          </button>

          {/* Favorite */}
          <button
            onClick={handleFavoriteClick}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition
              ${
                isFavorite(star.id)
                  ? "bg-pink-700 hover:bg-pink-800 text-white"
                  : "bg-indigo-900 hover:bg-indigo-800 text-pink-300"
              }`}
          >
            {isFavorite(star.id) ? "💔 Remove" : "💖 Save"}
          </button>
        </div>
      </div>

          {/* Details Modal */}
            {isModalOpen && (
                <StarDetailsModal
                star={star}
                onClose={() => setIsModalOpen(false)}
                />
            )}
            </>
        );
        }

export default StarItem;