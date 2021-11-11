const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  customer_name: String,
  contact_number: String,
  bill_path: String,
  products: Array,
}, {
  timestamps: true
});

SalesSchema.index({ name: 1 });

module.exports = mongoose.model("Sales", SalesSchema);
