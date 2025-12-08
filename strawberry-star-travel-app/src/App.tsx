import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import StarsList from "./features/stars/components/StarsList";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  return (
    <>
    <Navbar />
     <div className="pt-20">
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<h1>Welcome to the Strawberry Star Travel App!</h1>} />

      {/* Login & Signup */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Stars / Browse page */}
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

      {/* Dashboard page */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
    </Routes>
     </div>
    </>
  );
}

export default App;