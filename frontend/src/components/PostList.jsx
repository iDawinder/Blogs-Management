import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Helper function to truncate text to a specified maximum length
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to retrieve all posts
  const fetchPosts = () => {
    axios
      .get('http://localhost:5000/api/posts')
      .then((response) => setPosts(response.data))
      .catch((err) => console.error(err));
  };

  // Function to delete a post and update the UI
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://localhost:5000/api/posts/${id}`)
        .then(() => {
          // Remove the deleted post from the state so the UI updates
          setPosts(posts.filter((post) => post._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Link
        to="/create"
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block mb-4"
      >
        Create New Post
      </Link>
      {posts.map((post) => (
        <div key={post._id} className="border p-4 mb-2 rounded">
          <h2 className="text-2xl font-semibold">
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-600">
            by {post.author} on {new Date(post.timestamp).toLocaleString()}
          </p>
          <p className="mt-2">{truncateText(post.content, 100)}</p>
          <div className="mt-4">
            <Link
              to={`/edit/${post._id}`}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(post._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
