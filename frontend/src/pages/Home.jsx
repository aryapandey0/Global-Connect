import { useState } from "react";
import PostCard from "../components/PostCard";


export default function Home() {
  const [currentView, setCurrentView] = useState("feed");

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alice Johnson",
      content: "Just finished a big project!",
      image: null,
      likes: 0,
      comments: [],
      shares: 0
    },
    {
      id: 2,
      author: "Bob Smith",
      content: "Check out this view!",
      image: "https://via.placeholder.com/400x250",
      likes: 0,
      comments: [],
      shares: 0
    }
  ]);

  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setNewPostImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!newPostText && !newPostImage) return;
    const newPost = {
      id: Date.now(),
      author: "You",
      content: newPostText,
      image: newPostImage,
      likes: 0,
      comments: [],
      shares: 0
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
    setNewPostImage(null);
  };

  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleShare = (id) => {
    const originalPost = posts.find(post => post.id === id);
    if (!originalPost) return;
    const sharedPost = {
      ...originalPost,
      id: Date.now(),
      author: `You (shared from ${originalPost.author})`,
      shares: 0
    };
    setPosts([sharedPost, ...posts]);
    setPosts(posts.map(post =>
      post.id === id ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: Date.now(), author: "You", text }] }
        : post
    ));
  };

  return (
    <div className="p-6 space-y-6">

      {currentView === "feed" && (
        <>
          {/* Create Post */}
          <div className="bg-white shadow rounded p-4">
            <textarea
              placeholder="What's on your mind?"
              className="w-full border rounded p-2 mb-2 outline-none"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            {newPostImage && (
              <div className="mb-2">
                <img src={newPostImage} alt="Preview" className="max-h-60 rounded" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <label className="cursor-pointer bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
                Add Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <button
                onClick={handlePost}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Post
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="p-4 space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onShare={handleShare}
                onAddComment={handleAddComment}
              />
            ))}
          </div>
        </>
      )}

      {currentView === "login" && <Login />}
      {currentView === "register" && <Register />}
    </div>
  );
}
