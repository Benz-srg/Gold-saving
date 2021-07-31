const mongoose = require("mongoose");

const JoinRoomsSchema = new mongoose.Schema({
  bonus_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  type: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  owner: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  user: {
    type: Array,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  user: {
    type: Array,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.JoinRoomsSchema ||
  mongoose.model("JoinRooms", JoinRoomsSchema);
