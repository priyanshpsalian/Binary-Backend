const mongoose = require("mongoose");

const book = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organiser: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // phone: {
  //   type: Number,
  //   required: true,
  // },
  location: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  events: [
    {
      name: String,
      description: String,
      date: Date,
      speaker: String,
      img: String,
      mode: String,
      community_name: String,
    },
  ],
  chats: [
    {
      sent_by: String,
      description: String,
      
    },
  ],
});

const book_data = new mongoose.model("book_data", book);
module.exports = book_data;
