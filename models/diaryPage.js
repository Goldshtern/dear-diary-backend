const mongoose = require("mongoose");
const validator = require("validator");

const diaryPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("diaryPage", diaryPageSchema);
