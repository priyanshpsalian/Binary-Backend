const mongoose = require("mongoose");

const eventschema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  organiser: {
    type: String,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  imagepath: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: false,
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
  location: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  preference: {
    type: String,
  },

  likes: {
    type: Number,
    default: 0,
  },
  totalseats: {
    type: Number,
    required: true,
  },
  emptyseats: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  community: {
    type: String,
    required: true,
  },
});

const Event = new mongoose.model("Event", eventschema);
module.exports = Event;
