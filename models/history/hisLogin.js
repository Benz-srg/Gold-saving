const mongoose = require("mongoose");
const hisLoginSchema = new mongoose.Schema({
  user_id: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  datetime: {
    type: Date,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  device: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
  browser_name: {
    type: String,
    maxlength: [300, "Title cannot be more than 40 characters"],
  },
});
module.exports =
  mongoose.model.hisLoginSchema || mongoose.model("hisLogin", hisLoginSchema);
