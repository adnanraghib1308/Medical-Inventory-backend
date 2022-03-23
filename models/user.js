const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  gst_number: String,
  company_name: String,
  company_address: String,
  footer_text: String,
  role: {
    type: String,
    enum: ['admin', 'user']
  }
});

UserSchema.index({email: 1, first_name: 1, last_name: 1});

module.exports = mongoose.model("User", UserSchema);
