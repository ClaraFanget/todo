const mongoose = require("mongoose");
const taskModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter a title for the task"],
    },
    description: {
      type: String,
      required: false,
    },
    etimated_time: {
      type: Number,
      required: false,
    },
    deadline: {
      type: Date,
      required: [true, "Enter a password"],
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "low",
    },
    status: {
      type: String,
      enum: ["finised", "not started", "in progress"],
      default: "not started",
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const task = mongoose.model("task", taskModel);
module.exports = task;
