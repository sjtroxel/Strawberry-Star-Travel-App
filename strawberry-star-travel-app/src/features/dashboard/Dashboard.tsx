// import React from "react";
import { useUser } from "../../hooks/useUser";

export default function Dashboard() {
  const { user } = useUser();

  // Get username from Supabase metadata
  const username = user?.user_metadata?.username;

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {username || "traveler"}! ✨
      </h1>

      <p className="text-lg mb-6">
        You’ve successfully boarded the Strawberry Star Travel App.  
        Select a destination, explore the galaxy, or manage your account.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">🌟 Browse Stars</h2>
          <p className="text-sm">
            View destinations across the galaxy, categorized by brightness,
            distance, and unique features.
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">👤 Your Profile</h2>
          <p className="text-sm">
            Manage your traveler account, preferences, and mission logs.
          </p>
        </div>
      </div>
    </div>
  );
}
