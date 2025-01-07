const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    quotes: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
    default:Date.now
  }
  
});


const Quotes = mongoose.model('Quotes', QuoteSchema);

module.exports = Quotes;
