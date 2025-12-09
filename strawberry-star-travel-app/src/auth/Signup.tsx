import React from "react";
import { supabase } from "../supabaseClient";

export default function Signup() {

  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [message, setMessage] = React.useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    // Basic client-side validation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!username || !email || !firstName || !lastName) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          firstName,
          lastName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      const newUser = data.user;
      const newUsername = newUser?.user_metadata?.username;
      setMessage(`Signup successful, ${newUsername}! Check your email to verify your account.`);
    }
  }

  return (
  <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] pt-20"> 
    <div className="max-w-sm w-full mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-5 text-center">Create an Account</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="p-2 rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="p-2 rounded text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 rounded text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 rounded text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-3 bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            Sign Up
          </button>
        </form>


      {message && <p className="mt-3 text-sm text-red-300">{message}</p>}
    </div>
  </div> 
  );
}