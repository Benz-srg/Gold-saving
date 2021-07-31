const mongoose = require("mongoose");

const hisSavingRoomsSettingSchema = new mongoose.Schema({
  room_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  min_member: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  installment: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  day: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  point: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  fee: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  update_by: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  update_date: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.hisSavingRoomsSetting ||
  mongoose.model("hisSavingRoomsSetting", hisSavingRoomsSettingSchema);
