import type { Star } from "./Star";
import { useWikipediaSummary } from "./hooks/useWikipediaSummary";
import {
  spectralExplanation,
  estimateTemperature,
  travelTimeLy,
} from "./utils/astronomy";

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

  // Wikipedia lookup (prioritize HIP)
  const { data, loading, error } = useWikipediaSummary(star);

  // Derived astronomy
  const spectralInfo = spectralExplanation(star.spectralType);
  const temperature = estimateTemperature(star.spectralType);
  const travelYears = travelTimeLy(star.distanceLy, 0.1);

  // Compute light-years and parsecs correctly
  // Assume star.distanceLy actually stores parsecs (from the HYG database)
  const distancePc = star.distanceLy; // stored in the dataset as parsecs
  const distanceLy = distancePc * 3.26156;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 text-white max-w-lg w-full mx-4 rounded-xl shadow-xl border border-gray-700 p-6 relative">
        
        {/* Close */}
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

        {/* Core Details */}
        <ul className="space-y-2 text-sm text-gray-200">
          <li>
            <span className="font-semibold">Designation:</span>{" "}
            HIP {star.designation}
          </li>

          <li>
            <span className="font-semibold">Spectral Type:</span>{" "}
            {star.spectralType}
          </li>

          <li>
            <span className="font-semibold">Distance:</span> {distanceLy.toFixed(2)} light-years{" "}
            <span className="text-gray-400">({distancePc.toFixed(2)} pc)</span>
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

        {/* Derived Science */}
        <div className="mt-4 space-y-2 text-sm text-gray-300">
          {spectralInfo && (
            <div>
              <span className="font-semibold text-gray-100">
                Stellar Classification:
              </span>{" "}
              {spectralInfo}
            </div>
          )}

          {temperature && (
            <div>
              <span className="font-semibold text-gray-100">
                Estimated Surface Temperature:
              </span>{" "}
              ~{temperature.toLocaleString()} K
            </div>
          )}
        </div>

        {/* Optional Image */}
        {star.imageUrl && (
          <img
            src={star.imageUrl}
            alt={`Image of ${displayName}`}
            className="mt-4 w-full rounded-lg border border-gray-600"
          />
        )}

        {/* Travel Flavor */}
        <div className="mt-4 text-xs text-red-400 italic">
          At 10% the speed of light, a spacecraft would take approximately{" "}
          {Math.round(travelYears).toLocaleString()} years to reach this star.
        </div>

        {/* Wikipedia */}
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
