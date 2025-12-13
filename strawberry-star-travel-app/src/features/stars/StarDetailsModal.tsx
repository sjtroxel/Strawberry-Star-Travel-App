import type { Star } from "./Star";

interface StarDetailsModalProps {
  star: Star;
  onClose: () => void;
}

export default function StarDetailsModal({
  star,
  onClose,
}: StarDetailsModalProps) {
  const displayName =
    star.name && star.name.trim() !== "" ? star.name : "Unnamed Star";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 text-white max-w-lg w-full mx-4 rounded-xl shadow-xl border border-gray-700 p-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">
          {displayName}
        </h2>

        {/* Details */}
        <ul className="space-y-2 text-sm text-gray-200">
          <li>
            <span className="font-semibold">Designation:</span>{" "}
            {star.designation}
          </li>
          <li>
            <span className="font-semibold">Spectral Type:</span>{" "}
            {star.spectralType}
          </li>
          <li>
            <span className="font-semibold">Distance:</span>{" "}
            {star.distanceLy.toFixed(2)} light-years
          </li>
          <li>
            <span className="font-semibold">Constellation:</span>{" "}
            {star.constellation}
          </li>
          <li>
            <span className="font-semibold">Apparent Magnitude:</span>{" "}
            {star.apparentMagnitude}
          </li>
        </ul>

        {/* Image (optional) */}
        {star.imageUrl && (
          <img
            src={star.imageUrl}
            alt={`Image of ${displayName}`}
            className="mt-4 w-full rounded-lg border border-gray-600"
          />
        )}

        {/* Phase 2 placeholder */}
        <div className="mt-6 text-xs text-gray-400 italic">
          More astronomical context coming soon ✨
        </div>
      </div>
    </div>
  );
}
