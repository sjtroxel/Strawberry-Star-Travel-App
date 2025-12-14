export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-rose-950">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 sm:py-24 flex-shrink-0">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-pink-700 drop-shadow-lg">
          😻 Strawberry Star Travel 🌠
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-300 italic leading-relaxed">
          Explore real stars. Save your favorites.<br />
          One day, plot a journey across the galaxy. 🚀
        </p>
      </section>

      {/* Feature Teasers */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 flex-shrink-0">
        <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-yellow-300 mb-3">🌌 Real Astronomy</h3>
          <p className="text-gray-300 text-sm">
            Browse real stars with accurate distances, classifications, and scientific context.
          </p>
        </div>

        <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-pink-300 mb-3">💖 Favorite Destinations</h3>
          <p className="text-gray-300 text-sm">
            Save up to ten stars as potential destinations for your future interstellar journey.
          </p>
        </div>

        <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-bold text-indigo-300 mb-3">🗺 Galactic Map</h3>
          <p className="text-gray-300 text-sm">
            Coming soon: visualize your favorite stars on an interactive galactic map.
          </p>
        </div>
      </section>
    </main>
  );
}
