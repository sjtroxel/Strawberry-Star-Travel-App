import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";
import Strawberry from "../../styles/Strawberry.png";

export default function Dashboard() {
  const { user } = useUser();

  // Get username/avatar from Supabase metadata
  const username = user?.user_metadata?.username;
  const avatarUrl = user?.user_metadata?.avatar;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-36 pb-16 text-white">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        {/* BIG AVATAR */}
        <img
          src={avatarUrl || Strawberry}
          alt="User avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-400 shadow-lg"
        />

        <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-center">
          Welcome, {username || "traveler"}! ✨
        </h1>
      </div>

      <p className="text-lg mb-10 text-center max-w-2xl mx-auto text-gray-300">
        You have successfully boarded the Strawberry Star Travel App.
        Select a destination, explore the galaxy, or manage your account.
      </p>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Browse Stars */}
        <Link to="/browse-stars">
          <div className="bg-gray-900 p-6 rounded-xl shadow hover:bg-gray-700 transition cursor-pointer h-full">
            <h2 className="text-xl font-semibold mb-2">🌟 Browse Stars</h2>
            <p className="text-sm text-gray-300">
              View destinations across the galaxy, categorized by brightness,
              distance, and unique features.
            </p>
          </div>
        </Link>

        {/* Profile */}
        <Link to="/profile">
          <div className="bg-gray-900 p-6 rounded-xl shadow hover:bg-gray-700 transition cursor-pointer h-full">
            <h2 className="text-xl font-semibold mb-2">👤 Your Profile</h2>
            <p className="text-sm text-gray-300">
              Manage your traveler account, preferences, and mission logs.
            </p>
          </div>
        </Link>

        {/* Favorites */}
        <Link to="/favorites">
          <div className="bg-gray-900 p-6 rounded-xl shadow hover:bg-gray-700 transition cursor-pointer h-full">
            <h2 className="text-xl font-semibold mb-2">💖 Favorites</h2>
            <p className="text-sm text-gray-300">
              View all the stars you've marked as favorites and manage your personal collection.
            </p>
          </div>
        </Link>

        {/* Galactic Map — Coming Soon */}
        <div className="bg-gray-900/60 p-6 rounded-xl border border-pink-500/30 shadow h-full opacity-75">
          <h2 className="text-xl font-semibold mb-2 text-pink-300">
            🗺 Galactic Map
          </h2>
          <p className="text-sm text-gray-300">
            Visualize your favorite stars on an interactive galactic map and plot routes
            between destinations.
          </p>
          <p className="mt-3 text-xs italic text-pink-400">
            Coming soon ✨
          </p>
        </div>
      </div>
    </div>
  );
}
