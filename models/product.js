const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  low_stock_warning: Number,
  cost_price: Number,
  selling_price: Number,
});

ProductSchema.index({ name: 1 });

module.exports = mongoose.model("Product", ProductSchema);
