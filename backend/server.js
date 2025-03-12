const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRoute = require('./routes/posts');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/posts', postsRoute);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/blogdb2')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.error('MongoDB connection error:', err));

