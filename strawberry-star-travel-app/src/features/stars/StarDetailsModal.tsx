import type { Star } from "./Star";
import { useWikipediaSummary } from "./hooks/useWikipediaSummary";

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

    // Wikipedia Lookup
  const { data, loading, error } = useWikipediaSummary(star);

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

        {/* Wikipedia Section */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-pink-300 mb-2">
            Astronomical Context
          </h3>

          {loading && (
            <p className="text-sm text-gray-400 italic">
              Fetching interstellar knowledge from Wikipedia…
            </p>
          )}

          {error && (
            <p className="text-sm text-gray-500 italic">
              No Wikipedia article available for this star.
            </p>
          )}

          {data && (
            <>
              <p className="text-sm text-gray-200 leading-relaxed">
                {data.extract}
              </p>

              {data.content_urls?.desktop?.page && (
                <a
                  href={data.content_urls.desktop.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-pink-400 hover:text-pink-300 underline"
                >
                  Read more on Wikipedia →
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}