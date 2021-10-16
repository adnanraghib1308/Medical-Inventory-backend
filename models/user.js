const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'user']
  }
});

UserSchema.index({email: 1, first_name: 1, last_name: 1});

module.exports = mongoose.model("User", UserSchema);
