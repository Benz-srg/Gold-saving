const mongoose = require("mongoose");

const OneTimePasswordSchema = new mongoose.Schema({
  otp: {
    type: String,
    maxlength: [100, "Title cannot be more than 40 characters"],
  },
  ref: {
    type: String,
    maxlength: [100, "Title cannot be more than 40 characters"],
  },
  datetime: {
    type: String,
    maxlength: [100, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.OneTimePassword ||
  mongoose.model("OneTimePassword", OneTimePasswordSchema);
