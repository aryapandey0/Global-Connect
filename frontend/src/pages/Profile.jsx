import { useState, useEffect } from "react";

export default function Profile() {
  const defaultUser = {
    name: "John Doe",
    bio: "Full Stack Developer | Building cool stuff with MERN 🚀",
    photo: "https://via.placeholder.com/150",
    posts: []
  };

  const [user, setUser] = useState(defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(defaultUser);
  const [newPost, setNewPost] = useState({ content: "", image: "" });

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("profileData");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEditData(parsed);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(user));
  }, [user]);

  const handleSaveProfile = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleAddPost = () => {
    if (!newPost.content && !newPost.image) return;
    const updatedPosts = [
      { id: Date.now(), content: newPost.content, image: newPost.image, date: new Date().toISOString().split("T")[0] },
      ...user.posts
    ];
    setUser({ ...user, posts: updatedPosts });
    setNewPost({ content: "", image: "" });
  };

  // Convert file to Base64 string
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "profile") {
        setEditData({ ...editData, photo: reader.result });
      } else if (type === "post") {
        setNewPost({ ...newPost, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded p-6 flex items-center gap-6">
        <img
          src={isEditing ? editData.photo : user.photo}
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
              <input
                type="file"
                className="mb-2"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profile")}
              />
              <button
                onClick={handleSaveProfile}
                className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.bio || "No bio yet."}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 bg-orange-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Add New Post */}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Create New Post</h2>
        <textarea
          className="border p-2 rounded w-full mb-2"
          placeholder="Write something..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="file"
          className="mb-2"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "post")}
        />
        <button
          onClick={handleAddPost}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      {/* Posts Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <div className="space-y-4">
          {user.posts.length > 0 ? (
            user.posts.map((post) => (
              <div key={post.id} className="bg-white shadow rounded p-4">
                {post.content && <p className="text-gray-800 mb-2">{post.content}</p>}
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="rounded max-h-60 object-cover mb-2"
                  />
                )}
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
