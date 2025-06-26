const mongoose = require("mongoose");
const schema = mongoose.Schema;

const teamSchema = new schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const Teams = mongoose.model("teams",teamSchema)
module.exports = Teams