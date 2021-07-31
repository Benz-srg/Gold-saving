const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
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
  fileUserWithIdCard: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  dateRegister: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  status: {
    type: String,
    maxlength: [100, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.Register || mongoose.model("Register", RegisterSchema);
