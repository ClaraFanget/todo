const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Enter your first name"],
    },
    last_name: {
      type: String,
      required: [true, "Enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Enter an email"],
    },
    password: {
      type: String,
      required: [true, "Enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userModel);
module.exports = user;
