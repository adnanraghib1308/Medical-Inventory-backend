const router = require('express').Router();

// helpers
const { asyncWrapper } = require("../helpers/utils");
const { isAuthenticated } = require("../helpers/auth");

// dao
const SalesDAO = require('../dao/sales');

const getAllSalesData = asyncWrapper(async (req, res) => {
  const salesData = await SalesDAO.getAllSalesDocuments();
  res.sendformat({ data: salesData });
})

router.get('/', getAllSalesData);
module.exports = router;