const Product = require('../models/product');

const addNewProduct = async (productData) => {
  return await Product.create(productData);
}

const getAllProducts = async (filter) => {
  return Product.find(filter);
}

const fetchSimilarProduct = async (searchString) => {
  return await Product.find({
    name: { $regex: searchString }
  })
}

const getProductDataUsingId = async (id) => {
  return await Product.findOne({_id: id});
}

const updateProductUsingId = async (id, product) => {
  return await Product.findOneAndUpdate({_id: id}, product);
}

const deleteProductUsingId = async (id) => {
  return await Product.deleteOne({_id: id});
}

module.exports = {
  addNewProduct,
  getAllProducts,
  fetchSimilarProduct,
  getProductDataUsingId,
  updateProductUsingId,
  deleteProductUsingId
};