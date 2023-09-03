const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    en: {
      type: String,
    },
    ru: {
      type: String,
    },
    color: {
      type: String,
    }
  },
  subtitle: {
    en: {
      type: String,
    },
    ru: {
      type: String,
    }
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
  link: {
    type: Boolean,
  },
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('idea-card', cardSchema); 