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
    id,
    name,
    quantity_in_stock: quantityInStock,
    low_stock_warning: lowStockWarning,
    cost_price: costPrice,
    selling_price: sellingPrice,
    party_name: partyName,
    mfg_date: mfgDate,
    exp_date: expDate
  } = req.body;

  // null check
  if(!name || !quantityInStock || !lowStockWarning || !sellingPrice)
    throw new HandledError("Please provide all the necessary values");

  console.log(">>>>>>>id ", id);
  if(id){
    await ProductDAO.updateProductUsingId(id, {
      name,
      stock: quantityInStock,
      low_stock_warning: lowStockWarning,
      cost_price: costPrice,
      selling_price: sellingPrice,
      party_name: partyName,
      exp_date: expDate,
      mfg_date: mfgDate
    })

    return res.sendformat({ message: "success" });
  }
  await ProductDAO.addNewProduct({
    name,
    stock: quantityInStock,
    low_stock_warning: lowStockWarning,
    cost_price: costPrice,
    selling_price: sellingPrice,
    party_name: partyName,
    exp_date: expDate,
    mfg_date: mfgDate
  });
  
  res.sendformat({ message: "success" });
});

const getProducts = asyncWrapper(async (req, res) => {
  const filter = req.body;
  var newFilter = {name: {$regex: "", $options: 'i'}, party_name: {$regex: "", $options: 'i'}};
  if(filter.name) {newFilter.name.$regex = filter.name};
  if(filter.party_name) {newFilter.party_name.$regex = filter.party_name};

  const products = await ProductDAO.getAllProducts(newFilter);
  res.sendformat({data: products});
})

const getProductDataUsingId = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  if(!id) throw  new HandledError("No id found");
  const productData = await ProductDAO.getProductDataUsingId(id);
  console.log("ID>>>>>", id);
  console.log("data>>>>>", productData);
  res.sendformat({data: productData});
})

const deleteProduct = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  if(!id) throw new HandledError("No id found");
  await ProductDAO.deleteProductUsingId(id);
  res.sendformat({message: "success"});
})

router.get('/:id', isAuthenticated, getProductDataUsingId);

router.post('/', isAuthenticated, addProduct);
router.post('/list', isAuthenticated, getProducts);

router.delete('/:id', isAuthenticated, deleteProduct);

module.exports = router;
