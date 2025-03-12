import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/posts/${id}`)
        .then((response) => setForm(response.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://localhost:5000/api/posts/${id}`, form)
        .then(() => navigate(`/posts/${id}`))
        .catch((err) => console.error(err));
    } else {
      axios
        .post('http://localhost:5000/api/posts', form)
        .then(() => navigate('/'))  // Redirect to the list view instead of the individual post view
        .catch((err) => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows="5"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PostForm;
