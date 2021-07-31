const mongoose = require("mongoose");
const BillSchema = new mongoose.Schema({
  user_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  time: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  money: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  status: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  bill_path: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  upload_date: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  room_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.BillSchema || mongoose.model("Bill", BillSchema);
