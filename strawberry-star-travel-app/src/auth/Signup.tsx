import React from "react";
import { supabase } from "../supabaseClient";

export default function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Check your email to verify your account.");
    }
  }

  return (
    <div className="max-w-sm mx-auto p-4 bg-gray-900 text-white rounded-lg mt-10">
      <h2 className="text-xl mb-4">Create an Account</h2>

      <form onSubmit={handleSignup} className="flex flex-col gap-3">
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
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Sign Up
        </button>
      </form>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}