const mongoose = require("mongoose");

const hisSavingRoomsSchema = new mongoose.Schema({
  room_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  token: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  owner: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  weight: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  price: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  status: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  start_date: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  end_date: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  day: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  installment: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  member: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  created_date: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  approve_by: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  modify_by: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  alert_status: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  alert_total: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.hisSavingRooms ||
  mongoose.model("hisSavingRooms", hisSavingRoomsSchema);
