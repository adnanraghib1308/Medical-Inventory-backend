const Sales = require('../models/sales');
const moment = require('moment');

const createSalesDocument = async(creationFields) => {
  return await Sales.create(creationFields);
}

const getAllSalesDocumentsUsingFilter = async(filter) => {
  return await Sales.find(filter).sort({createdAt: -1});
}

const getSalesAmountOfLastMonth = async (user_id) => {
  return await Sales.find({
    user_id,
    createdAt: {
      $gte: moment().subtract(1, 'month')
    }
  }).sort({createdAt: -1});
};

const getSalesAmountOfLastWeek = async (user_id) => {
  return await Sales.find({
    user_id,
    createdAt: {
      $gte: moment().subtract(1, 'week')
    }
  });
};

const getSalesAmountOfLastDay = async (user_id) => {
  return await Sales.find({
    user_id,
    createdAt: {
      $gte: moment().subtract(1, 'day')
    }
  });
};

const getLastOrderNumber = async () => {
  const sale = await Sales.findOne({}).sort({createdAt: -1});
  console.log("<<< sale", sale);
  return sale ? sale.order_number : 100000;
}

module.exports = { createSalesDocument, getAllSalesDocumentsUsingFilter, getSalesAmountOfLastMonth, getSalesAmountOfLastWeek, getSalesAmountOfLastDay, getLastOrderNumber };