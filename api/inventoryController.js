const router = require("express").Router();

// helpers
const { asyncWrapper } = require("../helpers/utils");
const { isAuthenticated } = require("../helpers/auth");

// dao
const ProductDAO = require('../dao/product');

// errors
const HandledError = require("../error/handledError");

const addProduct = asyncWrapper(async (req, res) => {
  const {
    name,
    quantity_in_stock: quantityInStock,
    low_stock_warning: lowStockWarning,
    cost_price: costPrice,
    selling_price: sellingPrice,
  } = req.body;

  // null check
  if(!name || !quantityInStock || !lowStockWarning || !costPrice || !sellingPrice)
    throw new HandledError("Please provide all the necessary values");
  
  await ProductDAO.addNewProduct({
    name,
    stock: quantityInStock,
    low_stock_warning: lowStockWarning,
    cost_price: costPrice,
    selling_price: sellingPrice,
  });
  
  res.sendformat({ message: "success" });
});

const getProducts = asyncWrapper(async (req, res) => {
  const products = await ProductDAO.getAllProducts();
  res.sendformat({data: products});
})

router.post('/', isAuthenticated, addProduct);
router.get('/', isAuthenticated, getProducts);

module.exports = router;
