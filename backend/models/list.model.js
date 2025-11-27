const mongoose = require("mongoose");
const listModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter a title for the list"],
    },
    category: {
      type: String,
      enum: ["personal", "work"],
      required: true,
    },
    status: {
      type: String,
      enum: ["finised", "not started", "in progress"],
      default: "not started",
    },
  },
  {
    timestamps: true,
  }
);

const list = mongoose.model("list", listModel);
module.exports = list;
