import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StarsList from "./features/stars/components/StarsList";
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
          <main>
            <h1>Browse Stars</h1>
            <StarsList />
          </main>
        } 
      />
    </Routes>
     </div>
    </>
  );
}

export default App;