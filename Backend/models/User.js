const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6
  }
});

module.exports = mongoose.model("User", UserSchema);
