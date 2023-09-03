const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,

  },
  description: {
    type: Object,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  path: {
    type: String,

  },

  likes: [
  ],

  ownerAvatar: {
    type: Object,
    required: true,
  }
});


module.exports = mongoose.model('photo', photoSchema); 