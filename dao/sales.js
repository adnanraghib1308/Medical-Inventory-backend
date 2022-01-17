const Sales = require('../models/sales');
const moment = require('moment');

const createSalesDocument = async(creationFields) => {
  return await Sales.create(creationFields);
}

const getAllSalesDocumentsUsingFilter = async(filter) => {
  return await Sales.find(filter).sort({createdAt: -1});
}

const getSalesAmountOfLastMonth = async () => {
  return await Sales.find({
    createdAt: {
      $gte: moment().subtract(1, 'month')
    }
  }).sort({createdAt: -1});
};

const getSalesAmountOfLastWeek = async () => {
  return await Sales.find({
    createdAt: {
      $gte: moment().subtract(1, 'week')
    }
  });
};

const getSalesAmountOfLastDay = async () => {
  return await Sales.find({
    createdAt: {
      $gte: moment().subtract(1, 'day')
    }
  });
};

const getLastOrderNumber = async () => {
  const sale = await Sales.findOne({}).sort({createdAt: -1});
  console.log("<<< sale", sale);
  return sale.order_number ? sale.order_number : 100001;
}

module.exports = { createSalesDocument, getAllSalesDocumentsUsingFilter, getSalesAmountOfLastMonth, getSalesAmountOfLastWeek, getSalesAmountOfLastDay, getLastOrderNumber };