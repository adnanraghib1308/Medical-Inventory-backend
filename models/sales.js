const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  order_number: String,
  customer_name: String,
  contact_number: String,
  bill_path: String,
  products: Array,
  amount: Number
}, {
  timestamps: true
});

SalesSchema.index({ name: 1 });

module.exports = mongoose.model("Sales", SalesSchema);
