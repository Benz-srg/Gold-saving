const mongoose = require("mongoose");

const SavingRoomSettingSchema = new mongoose.Schema({
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
  point: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  day: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  fee: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.SavingRoomSetting ||
  mongoose.model("SavingRoomSetting", SavingRoomSettingSchema);
