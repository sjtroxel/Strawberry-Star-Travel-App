import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useUser } from "../hooks/useUser";
import Strawberry from "../styles/Strawberry.png";

export default function Navbar() {
  const { user } = useUser();
  const username = user?.user_metadata?.username;
  const avatar = user?.user_metadata?.avatar;
  const [menuOpen, setMenuOpen] = React.useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-5xl mx-auto flex gap-8 items-center justify-between">
        
        {/* Left side — Logo + Greeting */}
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-3xl hover:text-pink-300">
            🌟 Strawberry Star Travel 🍓
          </Link>

          {user && (
            <span className="text-pink-300 text-sm font-semibold hidden sm:block">
              Hello, {username || "traveler"}!
            </span>
          )}

          <img
            src={avatar || Strawberry}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-pink-300 shadow-sm
            transition-transform duration-300 hover:rotate-180"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Logged out */}
          {!user && (
            <>
              <Link to="/login"
                className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-base text-green-400 font-bold transition-colors">
                Log In
              </Link>

              <Link to="/signup"
                className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded text-base font-bold text-pink-200 transition-colors">
                Sign Up
              </Link>
            </>
          )}

          {/* Logged in */}
          {user && (
            <>
              {/* Hamburger Menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-pink-300 hover:text-pink-400 transition-all duration-300"
                >
                  <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
                  <span className="text-xs uppercase tracking-wider hidden sm:block">
                    Menu
                  </span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-gray-900 border border-pink-400 rounded-xl shadow-xl overflow-hidden animate-fadeIn">
                    <nav className="flex flex-col text-base">
                      <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 hover:bg-pink-900/30">
                        🏠 Dashboard
                      </Link>

                      <Link to="/browse-stars" onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 hover:bg-pink-900/30">
                        🌟 Browse Stars
                      </Link>

                      <Link to="/galactic-map" onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 hover:bg-pink-900/30 text-pink-300">
                        🗺 Galactic Map{" "}
                        <span className="ml-1 text-xs italic opacity-70">
                          (coming soon)
                        </span>
                      </Link>

                      <Link to="/favorites" onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 hover:bg-pink-900/30">
                        💖 Favorites
                      </Link>

                      <Link to="/profile" onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 hover:bg-pink-900/30">
                        👤 Profile
                      </Link>
                    </nav>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-bold">
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}