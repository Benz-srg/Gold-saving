const mongoose = require("mongoose");

const JoinRoomsSchema = new mongoose.Schema({
  room_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  user_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  status: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  total_savings: {
    type: Number,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  join_date: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  owner: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  total_installment: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  finish_date: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.JoinRoomsSchema ||
  mongoose.model("JoinRooms", JoinRoomsSchema);
