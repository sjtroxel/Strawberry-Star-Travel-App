import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";

import StarsList from "../../features/stars/StarsList";
import Dashboard from "../../features/dashboard/Dashboard";
import Profile from "../../features/profile/Profile";
import Login from "../../auth/Login";
import Signup from "../../auth/Signup";

export default function AppRouter() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={<h1>Welcome to the Strawberry Star Travel App!</h1>}
          />

          {/* Login & Signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Browse Stars */}
          <Route
            path="/browse-stars"
            element={
              <ProtectedRoute>
                <main>
                  <h1>Browse Stars</h1>
                  <StarsList />
                </main>
              </ProtectedRoute>
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
