const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  roles: {
    User: {
      type: Number,
      default: 4000,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
