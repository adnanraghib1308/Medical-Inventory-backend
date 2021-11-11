const Product = require('../models/product');

const addNewProduct = async (productData) => {
  return await Product.create(productData);
}

const getAllProducts = async () => {
  return Product.find({});
}

const fetchSimilarProduct = async (searchString) => {
  return await Product.find({
    name: { $regex: searchString }
  })
}
module.exports = {
  addNewProduct,
  getAllProducts,
  fetchSimilarProduct,
};