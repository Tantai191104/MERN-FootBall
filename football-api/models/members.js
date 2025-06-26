const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema(
  {
    membername: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    YOB: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Member = mongoose.model("Members", memberSchema);
module.exports = Member;