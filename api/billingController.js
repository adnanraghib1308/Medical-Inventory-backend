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
const ProductDAO = require('../dao/product');
const SalesDAO = require('../dao/sales');
const fs = require("fs");
const PDFDocument = require("pdfkit");
const niceInvoice = require('nice-invoice');
const path = require('path');

const searchProduct = asyncWrapper(async (req, res) => {
    const {search_string: searchString} = req.body;
    if(!searchString) throw new HandledError("Please provide searchString");

    const matchedProducts = await ProductDAO.fetchSimilarProduct(searchString);
    res.sendformat({data: matchedProducts});
})

const generateBill = asyncWrapper(async (req, res) => {
    const { customer_name, contact_number, products } = req.body;

    const invoiceDetail = BillingHelper.generateInvoiceDetail({ customer_name, contact_number, products });
    const filePath = `./files/${nanoid(8)}.pdf`;
    niceInvoice(invoiceDetail, filePath);
    await SalesDAO.createSalesDocument({
        customer_name,
        contact_number,
        sales_date: moment().format('MMMM Do YYYY, h:mm:ss a').toString(),
        bill_path: filePath,
        products
    })
    res.sendformat({file_path: filePath});

})

const download = asyncWrapper(async (req, res) => {
    const {file_path: filePath} = req.query;
    res.download(filePath);
})

router.post("/product-search", searchProduct);
router.post("/generate-bill", generateBill);
router.get('/download', download);

module.exports = router;