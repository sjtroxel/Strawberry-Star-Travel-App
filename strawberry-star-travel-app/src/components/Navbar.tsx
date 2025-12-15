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
    setMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 max-w-6xl">

        {/* Left: Title */}
        <Link
          to="/"
          className="font-bold text-base sm:text-2xl hover:text-pink-300 whitespace-nowrap"
        >
          Strawberry Star Travel
        </Link>

        {/* Desktop: greeting + avatar */}
        {user && (
          <div className="hidden sm:flex items-center gap-3 ml-6">
            <span className="text-pink-300 text-sm font-semibold">
              Hello, {username || "traveler"}!
            </span>
            <img
              src={avatar || Strawberry}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-pink-300"
            />
          </div>
        )}

        {/* Right: mobile avatar + hamburger */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Mobile avatar */}
          <img
            src={avatar || Strawberry}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-pink-300 sm:hidden"
          />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-pink-300 text-2xl sm:text-xl"
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-900 border-t border-gray-700 animate-fadeIn">
          <nav className="flex flex-col text-sm divide-y divide-gray-800">

            {!user && (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-800">
                  Log In
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-800">
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  🏠 Dashboard
                </Link>
                <Link to="/browse-stars" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  🌟 Browse Stars
                </Link>
                <Link to="/favorites" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  💖 Favorites
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  👤 Profile
                </Link>
                <Link to="/galactic-map" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30 text-pink-300">
                  🗺 Galactic Map <span className="text-xs italic opacity-70">(coming soon)</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-left text-red-400 hover:bg-red-900/20"
                >
                  Log Out
                </button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* ===== DESKTOP MENU ===== */}
      {menuOpen && (
        <div className="hidden sm:block absolute right-6 mt-2 w-64 bg-gray-900 border border-pink-400 rounded-xl shadow-xl animate-fadeIn">
          <nav className="flex flex-col text-sm divide-y divide-gray-800 rounded-xl overflow-hidden">

            {!user && (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-800">
                  Log In
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-800">
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  🏠 Dashboard
                </Link>
                <Link to="/browse-stars" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  🌟 Browse Stars
                </Link>
                <Link to="/favorites" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  💖 Favorites
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30">
                  👤 Profile
                </Link>
                <Link to="/galactic-map" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-pink-900/30 text-pink-300">
                  🗺 Galactic Map <span className="text-xs italic opacity-70">(coming soon)</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-left text-red-400 hover:bg-red-900/20"
                >
                  Log Out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
}
