const router = require("express").Router();
const bcrypt = require("bcryptjs");

// error
const HandledError = require('../error/handledError');

// helpers
const { asyncWrapper } = require('../helpers/utils')

// dao
const SalesDAO = require('../dao/sales');
const { isAuthenticated } = require("../helpers/auth");
const moment = require("moment");


const getSalesAmount = asyncWrapper(async (req, res) => {

  const user_id = req.user._id;
  const lastMonthSales = await SalesDAO.getSalesAmountOfLastMonth(user_id);
  const lastWeekSales = await  SalesDAO.getSalesAmountOfLastWeek(user_id);
  const lastDaySales = await SalesDAO.getSalesAmountOfLastDay(user_id);

  const lastMonthSalesAmount = lastMonthSales.reduce((prev, curr) => prev + curr.amount, 0);
  const lastWeekSalesAmount = lastWeekSales.reduce((prev, curr) => prev + curr.amount, 0);
  const lastDaySalesAmount = lastDaySales.reduce((prev, curr) => prev + curr.amount, 0);

  var last10DaysSale = [];
  for(let i=10; i>=1; i--){
    var obj = {};
    obj.sale_date = moment().subtract(i, 'day');
    last10DaysSale.push(obj);
  }

  for(let i=0;i<10;i++){
    var amount = 0;
    for(let j=0;j<lastMonthSales.length; ++j){
      const day1 = last10DaysSale[i].sale_date.startOf('day');
      const day2 = moment(lastMonthSales[j].createdAt).startOf('day');
      if(moment(day1).isSame(day2)){
        amount += lastMonthSales[j].amount;
      }
    }
    last10DaysSale[i].amount = amount;
  }
  const formatedLast10DaysSale = last10DaysSale.map(item => ({...item, sale_date: moment(item.sale_date).format("DD: MMMM").toString()}));
  res.sendformat({data: {lastMonthSalesAmount, lastWeekSalesAmount, lastDaySalesAmount, last10DaysSale: formatedLast10DaysSale}});
});

router.get('/', isAuthenticated, getSalesAmount);

module.exports = router