import React from "react";
import { homeFeatures } from "../data/homeFeatures";
import HomeFeatureCard from "./HomeFeatureCard";
import "./HomeCarousel.css";

export default function HomeCarousel() {
  const [index, setIndex] = React.useState(0);

  const rotateLeft = () =>
    setIndex((i) => (i - 1 + homeFeatures.length) % homeFeatures.length);

  const rotateRight = () =>
    setIndex((i) => (i + 1) % homeFeatures.length);

  return (
    <div className="home-carousel">
      <button onClick={rotateLeft} className="carousel-btn left">
        ‹
      </button>

      <div className="carousel-ring">
        {homeFeatures.map((feature, i) => {
          const offset = i - index;
          return (
            <div
              key={feature.id}
              className="carousel-item"
              style={{
                transform: `
                  rotateY(${offset * 60}deg)
                  translateZ(300px)
                `,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
            >
              <HomeFeatureCard
                feature={feature}
                onClick={() => {
                  // keep your existing modal logic here
                }}
              />
            </div>
          );
        })}
      </div>

      <button onClick={rotateRight} className="carousel-btn right">
        ›
      </button>
    </div>
  );
}
