const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  low_stock_warning: Number,
  selling_price: Number,
  party_name: String,
  mfg_date: Date,
  exp_date: Date
});

ProductSchema.index({ name: 1 });

module.exports = mongoose.model("Product", ProductSchema);
