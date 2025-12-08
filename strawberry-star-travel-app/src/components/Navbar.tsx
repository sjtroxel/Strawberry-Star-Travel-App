import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const { user } = useUser();

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
     <nav className="w-full fixed top-0 left-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-5xl mx-auto flex gap-8 items-center justify-between">
        <Link to="/" className="font-bold text-lg hover:text-pink-300">
          🌟 Strawberry Star Travel
        </Link>

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
          </>)}

           {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
