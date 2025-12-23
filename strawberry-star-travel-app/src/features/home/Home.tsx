import React from "react";
import Starfield from "../../components/Starfield";
import ShootingStars from "../../components/ShootingStars";
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
      <ShootingStars />
      {/* 🌟 Starfield with gradient */}
      <Starfield gradient="from-black via-gray-900 to-rose-950" />

      {/* Hero section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10">
        
        <div className="relative inline-block">
          {/* Lens flare */}
          <div className="lens-flare" aria-hidden />
          <h1
            className="
              font-extrabold tracking-tight text-5xl leading-tight sm:text-6xl md:text-7xl
              drop-shadow-[0_0_25px_rgba(255,100,200,0.45)]
              mb-6 pt-8 text-center relative z-10
            "
          >
            <span className="block depth depth-1 bg-linear-to-b from-rose-700 via-rose-500 to-red-400 bg-clip-text text-transparent">
              Strawberry
            </span>
            <span className="block depth depth-2 bg-linear-to-b from-pink-300 via-white to-zinc-500 bg-clip-text text-transparent">
              Star
            </span>
            <span className="block depth depth-3 bg-linear-to-b from-pink-500 via-fuchsia-400 to-rose-500 bg-clip-text text-transparent">
              Travel
            </span>
          </h1>
        </div>

        {/* 🐱 Strawberry’s cosmic floating avatar */}
        <img
          src={Strawberry}
          alt="Strawberry the cat"
          className="
            w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover
            border-2 border-red-500 shadow-xl
            animate-[float_4s_ease-in-out_infinite,glow_3s_ease-in-out_infinite]
            mb-2 mt-6
          "
        />

        {/* Tagline */}
        <p
          className="
            max-w-md sm:max-w-xl text-base sm:text-lg font-semibold italic text-gray-200 min-h-3.5rem
          "
        >
          <span className="tagline-line block">
            Discover real stars.
          </span>
          <span className="tagline-line block delay-1">
            Remember the ones that call to you.
          </span>
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
                "Explore real stars with accurate distances, classifications, and science-backed data.",
            },
            {
              title: "💖 Save Your Stars",
              color: "text-pink-300",
              text:
                "Build a personal shortlist of stars that fascinate you — future destinations, remembered forever.",
            },
            {
              title: "🌌 Galactic Perspective",
              color: "text-indigo-300",
              text:
                "See how your favorite stars fit into the wider galaxy. A bigger picture is coming.",
            },
            {
              title: "⭐ Star Fact of the Day",
              color: "text-rose-300",
              text:
                "Did you know? Light from some stars you see tonight began its journey before human civilization existed.",
            }
          ].map((card) => (
            <div
              key={card.title}
              className="relative rounded-2xl bg-gray-900/70 border border-gray-700 p-6 shadow-lg backdrop-blur-sm transition
              hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,100,200,0.15)] hover:border-pink-500/40"
            >
              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-linear-to-br from-pink-500/5 to-transparent opacity-0 hover:opacity-100 transition" />
              <h3 className={`mb-6 text-lg font-bold ${card.color}`}>{card.title}</h3>
              <p className="text-sm text-gray-300 pt-2 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-lg text-gray-200 font-semibold z-10">
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
          @keyframes titleShimmer {
            0% {
              filter: drop-shadow(0 0 4px rgba(255, 140, 200, 0.4))
                      drop-shadow(0 0 12px rgba(255, 90, 160, 0.3));
              opacity: 0.95;
            }
            50% {
              filter: drop-shadow(0 0 14px rgba(255, 180, 240, 0.7))
                      drop-shadow(0 0 30px rgba(255, 120, 200, 0.8));
              opacity: 1;
            }
            100% {
              filter: drop-shadow(0 0 4px rgba(255, 140, 200, 0.4))
                      drop-shadow(0 0 12px rgba(255, 90, 160, 0.3));
              opacity: 0.95;
            }
          }
          .depth {
            display: block;
            will-change: transform;
          }

          .depth-1 {
            animation: drift1 10s ease-in-out infinite;
          }

          .depth-2 {
            animation: drift2 12s ease-in-out infinite;
          }

          .depth-3 {
            animation: drift3 14s ease-in-out infinite;
          }

          @keyframes drift1 {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(-14px, -10px, 0); }
          }

          @keyframes drift2 {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(14px, -14px, 0); }
          }

          @keyframes drift3 {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0px, 16px, 0); }
          }
          /* --- Lens flare --- */
          .lens-flare {
            position: absolute;
            top: 50%;
            left: -60%;
            width: 220%;
            height: 14px;

            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 220, 255, 0.6),
              rgba(255, 255, 255, 0.9),
              rgba(255, 220, 255, 0.6),
              transparent
            );

            transform: translateY(-50%);
            opacity: 0;
            filter: blur(6px);
            mix-blend-mode: screen;

            animation: lensFlare 7s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes lensFlare {
            0%, 82% {
              opacity: 0;
              transform: translate(-60%, -50%);
            }

            85% {
              opacity: 0.8;
            }

            92% {
              opacity: 0;
              transform: translate(60%, -50%);
            }

            100% {
              opacity: 0;
            }
          }
          .tagline-line {
            opacity: 0;
            transform: translateY(6px);
            animation: taglineReveal 1.2s ease-out forwards;
          }

          .tagline-line.delay-1 {
              animation-delay: 1.4s;
          }

          @keyframes taglineReveal {
              to {
                opacity: 1;
                transform: translateY(0);
            }
          }
        `}
      </style>
    </main>
  );
}