const router = require('express').Router();
const moment = require('moment');

// helpers
const { asyncWrapper } = require("../helpers/utils");
const { isAuthenticated } = require("../helpers/auth");

// dao
const SalesDAO = require('../dao/sales');

const getAllSalesData = asyncWrapper(async (req, res) => {
  const filter = req.body;
  const user_id = req.user._id;
  var newFilter = {customer_name: {$regex: "", $options: 'i'}, contact_number: {$regex: "", $options: 'i'}, order_number: {$regex: "", $options: 'i'}};
  if(filter.customer_name) {newFilter.customer_name.$regex = filter.customer_name};
  if(filter.contact_number) {newFilter.contact_number.$regex = filter.contact_number};
  if(filter.order_number) {newFilter.order_number.$regex = filter.order_number};
  if(filter.sale_date){
    newFilter.createdAt = {
      $gte: moment(filter.sale_date).startOf('day'),
      $lte: moment(filter.sale_date).endOf('day')
    }
  }

  newFilter.user_id = user_id;

  const salesData = await SalesDAO.getAllSalesDocumentsUsingFilter(newFilter);
  res.sendformat({ data: salesData });
})

router.post('/', isAuthenticated, getAllSalesData);
module.exports = router;