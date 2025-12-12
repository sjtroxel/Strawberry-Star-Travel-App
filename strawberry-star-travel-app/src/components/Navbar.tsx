import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const { user } = useUser();
  const username = user?.user_metadata?.username;
  const avatar = user?.user_metadata?.avatar;

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-5xl mx-auto flex gap-8 items-center justify-between">
        
        {/* Left side — Logo + Greeting */}
        <div className="flex items-center gap-10">
          <Link to="/" className="font-bold text-3xl hover:text-pink-300">
            🌟 Strawberry Star Travel 🍓
          </Link>

          {/* Greeting + Mini-Avatar */}
          {user && (
            <span className="text-pink-300 text-sm font-semibold">
              Hello, {username || "traveler"}!
            </span>
          )}

            <img
                src={avatar || "https://via.placeholder.com/40?text=?"}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-pink-300 shadow-sm"
              />
        </div>

        {/* Right side — Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/browse-stars" className="hover:text-pink-300">
            Browse Stars
          </Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-pink-300">
                Log In
              </Link>

              <Link to="/signup" className="hover:text-pink-300">
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/dashboard" className="hover:text-pink-300">
                Dashboard
              </Link>

              <Link to="/profile" className="hover:text-pink-300">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Log Out
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
