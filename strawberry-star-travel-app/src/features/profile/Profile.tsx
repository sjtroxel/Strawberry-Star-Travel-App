import React from "react";
import { useUser } from "../../hooks/useUser";
import { supabase } from "../../supabaseClient";

export default function Profile() {
  const { user } = useUser();
  const [username, setUsername] = React.useState(user?.user_metadata?.username || "");
  const [firstName, setFirstName] = React.useState(user?.user_metadata?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.user_metadata?.lastName || "");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("")  
  const [message, setMessage] = React.useState("");

  async function handleUpdateProfile() {
    if (!user) return;

    const { error } = await supabase.auth.updateUser({
      data: { username, firstName, lastName },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile updated successfully!");
    }
  }

  async function handleChangePassword() {
    if (!user) return;

    if (!newPassword) {
      setMessage("Please enter a new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
  }


  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Your Profile</h2>

      {/* Show Email (read-only) */}
      <input
        type="email"
        placeholder="Email"
        value={user?.email || ""}
        readOnly
        className="p-2 rounded w-full mb-2 text-black bg-gray-300"
      />

      {/* Editable fields */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 rounded w-full mb-2 text-black"
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="p-2 rounded w-full mb-2 text-black"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="p-2 rounded w-full mb-2 text-black"
      />

      <button
        onClick={handleUpdateProfile}
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded mt-2 w-full"
      >
        Save Profile Changes
      </button>

      {/* Change password section */}
      <h3 className="text-lg font-semibold mt-10 mb-2 text-center">Change Password</h3>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="p-2 rounded w-full mb-2 text-black"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2 rounded w-full mb-2 text-black"
      />

      <button
        onClick={handleChangePassword}
        className="bg-green-600 hover:bg-green-700 p-2 rounded mt-2 w-full"
      >
        Change Password
      </button>

      {message && <p className="mt-2 text-green-300">{message}</p>}
    </div>
  );
}