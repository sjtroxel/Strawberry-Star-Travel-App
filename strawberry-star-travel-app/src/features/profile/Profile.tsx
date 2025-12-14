import React from "react";
import { useUser } from "../../hooks/useUser";
import { supabase } from "../../supabaseClient";

export default function Profile() {
  const { user } = useUser();
  const [username, setUsername] = React.useState(user?.user_metadata?.username || "");
  const [firstName, setFirstName] = React.useState(user?.user_metadata?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.user_metadata?.lastName || "");
  const [avatar, setAvatar] = React.useState(user?.user_metadata?.avatar || "");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("")  
  const [message, setMessage] = React.useState("");


  // Upload Avatar to Cloudinary
  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "strawberry-avatars");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/diiapd2pv/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data.secure_url) {
        setAvatar(data.secure_url);

        // Save to Supabase user metadata
        await supabase.auth.updateUser({
          data: { avatar: data.secure_url }
        });

        setMessage("Avatar updated!");
      }
    } catch {
      setMessage("Error uploading avatar.");
    }
  }  

  // Update Profile Fields
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

  // Password Change
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
    <div className="max-w-md mx-auto p-4 mt-28 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-3 text-center">Your Profile</h2>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={avatar || "https://via.placeholder.com/150?text=No+Avatar"}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-2 border-pink-300 shadow-md"
        />

        <label className="mt-2 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded cursor-pointer">
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </label>
      </div>      

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
        className="bg-blue-600 hover:bg-blue-700 p-1 rounded mt-1 w-full"
      >
        Save Profile Changes
      </button>

      {/* Change password section */}
      <h3 className="text-lg font-semibold mt-4 mb-2 text-center">Change Password</h3>
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
        className="bg-green-600 hover:bg-green-700 p-1 rounded mt-1 w-full"
      >
        Change Password
      </button>

      {message && <p className="mt-2 text-green-300">{message}</p>}
    </div>
  );
}