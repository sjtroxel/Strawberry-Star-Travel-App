// import React from "react";
import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom"

export default function Dashboard() {
  const { user } = useUser();

   console.log("USER FROM SUPABASE:", user);

  // Get username/avatar from Supabase metadata
  const username = user?.user_metadata?.username;
  const avatarUrl = user?.user_metadata?.avatar;

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <div className="flex flex-col items-center mb-6">
        {/* BIG AVATAR */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-pink-400 shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-3xl">
            👤
          </div>
        )}

        <h1 className="text-3xl font-bold mt-4">
          Welcome, {username || "traveler"}! ✨
        </h1>
      </div>

      <p className="text-lg mb-6 text-center">
        You have successfully boarded the Strawberry Star Travel App.  
        Select a destination, explore the galaxy, or manage your account.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

        {/* BROWSE STARS CARD */}
        <Link to="/browse-stars">
          <div className="bg-gray-900 p-4 rounded-xl shadow hover:bg-gray-700 transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">🌟 Browse Stars</h2>
            <p className="text-sm">
              View destinations across the galaxy, categorized by brightness,
              distance, and unique features.
            </p>
          </div>
        </Link>

        {/* CLICKABLE PROFILE CARD */}
        <Link to="/profile">
          <div className="bg-gray-900 p-4 rounded-xl shadow hover:bg-gray-700 transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">👤 Your Profile</h2>
            <p className="text-sm">
              Manage your traveler account, preferences, and mission logs.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}

