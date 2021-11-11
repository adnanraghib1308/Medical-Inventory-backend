const Sales = require('../models/sales');

const createSalesDocument = async(creationFields) => {
  return await Sales.create(creationFields);
}

const getAllSalesDocuments = async() => {
  return await Sales.find({}).sort({createdAt: -1});
}

module.exports = { createSalesDocument, getAllSalesDocuments };