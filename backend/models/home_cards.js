const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
 image: { 
    type: String,
    required: true, 
    },
  title: {
    en : { 
      type: String,
      required: true, 
      },
    ru : { 
      type: String,
      required: true, 
      }, 
  }
}); 

module.exports = mongoose.model('home-card', cardSchema); 