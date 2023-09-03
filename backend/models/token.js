const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  refreshToken: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('token', tokenSchema); 