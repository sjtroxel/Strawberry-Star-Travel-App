import { useEffect, useState } from "react";

interface Star {
  size: number;
  top: number;
  left: number;
  delay: number;
  opacity: number;
  driftX: number;
  driftY: number;
  duration: number;
}

export default function Home() {
  const [hideScroll, setHideScroll] = useState(false);
  const [stars] = useState<Star[]>(() =>
  Array.from({ length: 140 }, () => ({
    size: Math.random() * 2 + 2.5, // ⭐ slightly larger than before
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.5 + 0.6,

    // 🌌 drift in ANY direction
    driftX: (Math.random() - 0.5) * 200, // -100px → +100px
    driftY: (Math.random() - 0.5) * 200, // -100px → +100px
    duration: 20 + Math.random() * 20,   // 20s–40s
  }))
);


  useEffect(() => {
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
      {/* Stars */}
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animation: `
              twinkle 2.5s ease-in-out ${star.delay}s infinite,
              starDrift ${star.duration}s linear infinite
            `,
            '--dx': `${star.driftX}px`,
            '--dy': `${star.driftY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>

      {/* Gradient overlay */}
      <div className="pointer-events-none fixed inset-0 -z-100 bg-linear-to-b from-black via-gray-900 to-rose-950" />

      {/* Hero section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10">
        <h1 className="font-extrabold tracking-tight text-5xl leading-tight sm:text-6xl md:text-7xl drop-shadow-md">
          <span className="block text-pink-400">Strawberry</span>
          <span className="block text-white">Star</span>
          <span className="block text-rose-400">Travel</span>
        </h1>

        <p className="pt-8 mt-16 max-w-md text-base leading-relaxed text-gray-300 italic sm:text-lg sm:max-w-xl">
          Explore real stars. Save your favorites.
          <br />
          One day, plot a journey across the galaxy. 🚀
        </p>

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
              title: "🌌 Real Astronomy",
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
              title: "🗺 Galactic Map",
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
      <footer className="py-8 text-center text-xs text-gray-500 z-10">
        © {new Date().getFullYear()} sjtroxel. All rights reserved.
      </footer>

      {/* Animations */}
        <style>
        {`
          @keyframes starDrift {
            from {
              transform: translate(0, 0);
            }
            to {
              transform: translate(var(--dx), var(--dy));
            }
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.35);
            }
          }
        `}
        </style>
    </main>
  );
}