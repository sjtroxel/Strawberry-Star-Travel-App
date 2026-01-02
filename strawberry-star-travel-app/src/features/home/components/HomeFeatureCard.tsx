import type { HomeFeature } from "../data/homeFeatures";

type Props = {
  feature: HomeFeature;
  onClick: () => void;
};

export default function HomeFeatureCard({ feature, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        relative w-72 h-40 rounded-xl
        bg-white/10 backdrop-blur-xl
        border border-cyan-400/20
        shadow-lg text-left
        p-4 text-white
        hover:scale-105 transition
      "
    >
      <div className="text-3xl mb-2">{feature.icon}</div>
      <h3 className="text-lg font-bold">{feature.title}</h3>
      <p className="text-sm text-cyan-200 mt-1">
        {feature.description}
      </p>
    </button>
  );
}
