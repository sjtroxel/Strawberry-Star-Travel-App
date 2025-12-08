import React from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");

       // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
    }
  }

  return (
  <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] pt-20">
      <div className="max-w-sm w-full mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          Log In
        </button>
      </form>

      {message && <p className="mt-3 text-sm">{message}</p>}
       </div>
    </div>
  );
}