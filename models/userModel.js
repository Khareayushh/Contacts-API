const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: (true, "Please add the username"),
    },
    email: {
      type: String,
      required: (true, "Please add the email"),
      unique: (true, "Email address already Taken"),
    },
    password: {
      type: String,
      required: (true, "Please add the username"),
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);