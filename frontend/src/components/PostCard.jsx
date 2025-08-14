import React from "react";
import { FaHeart, FaRegComment, FaShare, FaUserPlus } from "react-icons/fa";

const PostCard = ({ post, onLike, onAddComment, onShare, onConnect, isConnected }) => {
  return (
    <div className="bg-orange-100 bg-opacity-60 backdrop-blur shadow-lg rounded-xl p-4 mb-4 border border-orange-200">
      {/* Author */}
      <div className="font-bold text-lg mb-1">{post.author}</div>
      
      {/* Content */}
      <div className="mb-2">{post.content}</div>

      {/* Image */}
      {post.image && (
        <div className="mb-2">
          <img src={post.image} alt="Post" className="rounded max-h-60 object-cover" />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-6 items-center mt-3 text-gray-700">
        {/* Like */}
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-1 hover:text-red-500"
        >
          <FaHeart /> {post.likes}
        </button>

        {/* Comment */}
        <button
          onClick={() => {
            const comment = prompt("Enter your comment:");
            if (comment) onAddComment(post.id, comment);
          }}
          className="flex items-center gap-1 hover:text-blue-500"
        >
          <FaRegComment /> {post.comments.length}
        </button>

        {/* Share */}
        <button
          onClick={() => onShare(post.id)}
          className="flex items-center gap-1 hover:text-green-500"
        >
          <FaShare /> {post.shares}
        </button>

        {/* Connect */}
        <button
          onClick={() => !isConnected && onConnect && onConnect(post.author)}
          className={`flex items-center gap-1 px-3 py-1 rounded 
            ${isConnected ? "bg-purple-300 text-white cursor-not-allowed" : "hover:text-purple-500"}`}
          disabled={isConnected}
        >
          <FaUserPlus /> {isConnected ? "Connected" : "Connect"}
        </button>
      </div>

      {/* Comments list */}
      {post.comments.length > 0 && (
        <div className="mt-3 space-y-1">
          {post.comments.map((c) => (
            <div key={c.id} className="text-sm border-t pt-1">
              <span className="font-semibold">{c.author}:</span> {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
