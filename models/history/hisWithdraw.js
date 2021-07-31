const mongoose = require("mongoose");
const hisWithdrawSchema = new mongoose.Schema({
  user_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  room_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  type: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  total: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  bank_name: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  bank_number: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  bank_account: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  bank_name_admin: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  bank_number_admin: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  bank_account_admin: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  transfer_datetime: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  change: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  point: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  withdraw_date: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  status: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  modify_by: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.hisWithdrawSchema ||
  mongoose.model("hisWithdraw", hisWithdrawSchema);
