import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold">{post.title}</h2>
      <p className="text-gray-600">
        by {post.author} on {new Date(post.timestamp).toLocaleString()}
      </p>
      <div className="mt-4">{post.content}</div>
      <div className="mt-4">
        <Link
          to={`/edit/${post._id}`}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostView;
