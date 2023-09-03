const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  h2: {
    type: String,

  },
  h3: {
    type: String,

  },
  h4: {
    type: String,

  },
  image1: {
    type: String,

  },
  image2: {
    type: String,

  },
  image3: {
    type: String,

  },
});

module.exports = mongoose.model('article', articleSchema); 