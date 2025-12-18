import React from "react";
import Starfield from "../../components/Starfield";
import Strawberry from "../../styles/Strawberry.png";

export default function Home() {
  const [hideScroll, setHideScroll] = React.useState(false);

  React.useEffect(() => {
    const hide = () => setHideScroll(true);
    window.addEventListener("wheel", hide, { passive: true });
    window.addEventListener("touchstart", hide);
    window.addEventListener("keydown", hide);
    window.addEventListener("mousedown", hide);
    return () => {
      window.removeEventListener("wheel", hide);
      window.removeEventListener("touchstart", hide);
      window.removeEventListener("keydown", hide);
      window.removeEventListener("mousedown", hide);
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden text-white">
      {/* 🌟 Starfield with gradient */}
      <Starfield gradient="from-black via-gray-900 to-rose-950" />

      {/* Hero section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10">
        
        {/* Title (slightly moved upward for space) */}
        <h1 className="font-extrabold tracking-tight text-5xl leading-tight sm:text-6xl md:text-7xl drop-shadow-md mb-6 pt-8">
          <span className="block text-pink-400">Strawberry</span>
          <span className="block text-white">Star</span>
          <span className="block text-rose-400">Travel</span>
        </h1>

        {/* 🐱 Strawberry’s cosmic floating avatar */}
        <img
          src={Strawberry}
          alt="Strawberry the cat"
          className="
            w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover
            border-2 border-pink-400 shadow-xl
            animate-[float_4s_ease-in-out_infinite,glow_3s_ease-in-out_infinite]
            mb-2 mt-6
          "
        />

        {/* Tagline */}
        <p className="max-w-md text-base leading-relaxed text-gray-300 italic sm:text-lg sm:max-w-xl">
          Explore real stars. Save your favorites.
          <br />
          One day, plot a journey across the galaxy. 🚀
        </p>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-6 text-gray-400 text-xs tracking-widest uppercase transition-opacity duration-500 ${
            hideScroll ? "opacity-0" : "opacity-100"
          }`}
        >
          Scroll
        </div>
      </section>

      {/* Features */}
      <section className="relative w-full py-28 z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              title: "🔭 Real Astronomy",
              color: "text-yellow-300",
              text:
                "Browse real stars with accurate distances, classifications, and scientific context.",
            },
            {
              title: "💖 Favorite Destinations",
              color: "text-pink-300",
              text:
                "Save up to ten stars as potential destinations for your future interstellar journey.",
            },
            {
              title: "🌌 Galactic Map",
              color: "text-indigo-300",
              text:
                "Coming soon: visualize your favorite stars on an interactive galactic map.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-gray-900/80 border border-gray-700 p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl hover:border-pink-500/40"
            >
              <h3 className={`mb-6 text-lg font-bold ${card.color}`}>{card.title}</h3>
              <p className="text-sm text-gray-300 pt-2 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-s text-gray-400 z-10">
        © {new Date().getFullYear()} sjtroxel. All rights reserved.
      </footer>

      {/* Custom keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 8px rgba(255, 100, 150, 0.4); }
            50% { box-shadow: 0 0 16px rgba(255, 150, 200, 0.7); }
            100% { box-shadow: 0 0 8px rgba(255, 100, 150, 0.4); }
          }
        `}
      </style>
    </main>
  );
}