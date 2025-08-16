import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", bio: "", photo: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
        setEditData({ name: data.name, bio: data.bio || "", photo: data.profilePic });
      } catch (err) {
        console.error("❌ Fetch user error:", err);
      }
    };
    if (token) fetchUser();
  }, [token]);

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("bio", editData.bio);
      if (editData.photo instanceof File) {
        formData.append("profilePic", editData.photo);
      }

      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const updatedUser = await res.json();
      setUser(updatedUser);
      setEditData({
        name: updatedUser.name,
        bio: updatedUser.bio || "",
        photo: updatedUser.profilePic,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, photo: file });
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded p-6 flex items-center gap-6">
        <img
          src={
            isEditing
              ? editData.photo instanceof File
                ? URL.createObjectURL(editData.photo)
                : editData.photo
              : user.profilePic
          }
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
        />

        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
              <textarea
                className="border p-2 rounded w-full mb-2"
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
              <button onClick={handleSaveProfile} className="bg-orange-500 text-white px-4 py-2 rounded mr-2">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.bio || "No bio yet."}</p>
              <button onClick={() => setIsEditing(true)} className="mt-2 bg-orange-500 text-white px-4 py-2 rounded">
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
