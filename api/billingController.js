const router = require("express").Router();
const moment = require('moment');
const {nanoid} = require('nanoid');

// helpers
const { asyncWrapper } = require("../helpers/utils");
const { isAuthenticated } = require("../helpers/auth");
const BillingHelper = require("../helpers/billing");

// error
const HandledError = require('../error/handledError');

// dao
const SalesDAO = require('../dao/sales');
const UserDAO = require('../dao/user');

const niceInvoice = require('../helpers/niceinvoice');

const generateBill = asyncWrapper(async (req, res) => {
    const { customer_name, customer_number: contact_number, products } = req.body;

    const lastOrderNumber = await SalesDAO.getLastOrderNumber();
    const orderNumber = parseInt(lastOrderNumber) + 1;
    console.log(">>>>>>>dfdsf");
    const user = await UserDAO.findOneUser({_id: req.user._id});
    console.log(">>>>>>> user", user)
    const invoiceDetail = BillingHelper.generateInvoiceDetail({ customer_name, contact_number, products, orderNumber, user });
    const filePath = `./files/${nanoid(8)}.pdf`;
    niceInvoice(invoiceDetail, filePath);
    const salesAmount = products.reduce((prev, curr) => prev+(parseInt(curr.selling_price)*parseInt(curr.quantity)), 0);
    await SalesDAO.createSalesDocument({
        order_number: orderNumber,
        customer_name,
        contact_number,
        sales_date: moment().format('MMMM Do YYYY, h:mm:ss a').toString(),
        bill_path: filePath,
        products,
        amount: salesAmount
    })
    res.sendformat({file_path: filePath});
})

const download = asyncWrapper(async (req, res) => {
    const {file_path: filePath} = req.query;
    res.download(filePath);
})

router.post("/generate-bill", isAuthenticated, generateBill);
router.get('/download', download);

module.exports = router;