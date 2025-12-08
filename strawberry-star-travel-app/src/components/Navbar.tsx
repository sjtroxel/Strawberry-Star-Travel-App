import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="max-w-5xl mx-auto flex gap-8 items-center">
        <Link to="/" className="font-bold text-lg hover:text-pink-300">
          🌟 Strawberry Star Travel
        </Link>

        <div className="flex gap-6">
          <Link to="/browse-stars" className="hover:text-pink-300">
            Browse Stars
          </Link>

          <Link to="/login" className="hover:text-pink-300">
            Log In
          </Link>

          <Link to="/signup" className="hover:text-pink-300">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
