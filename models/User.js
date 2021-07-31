const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  password: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  role: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  fname: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  lname: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  phonenumber: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  idcard: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  brithday: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  address: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  province: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  district: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  canton: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  postal_code: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  user_line_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  fileIdCard: {
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
  point: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  dateCreate: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  createby: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  status: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports = mongoose.model.User || mongoose.model("User", UserSchema);
