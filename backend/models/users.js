const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  avatar: {
    type: String,
    default: 'default-user-image.svg',
  },
  quote: {
    type: String,
  },

  collections: {
    type: Object,
    required: true,
  },

  drawing: {
    type: String,
  }
});


module.exports = mongoose.model('user', userSchema); 