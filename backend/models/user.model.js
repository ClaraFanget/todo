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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const user = mongoose.model("user", userModel);
module.exports = user;
