const router = require("express").Router();

const authController = require('./authController');
const homePageController = require('./homePageController');
const inventoryController = require('./inventoryController');
const billingController = require('./billingController');
const salesController = require('./salesController');
const userController = require('./userController');

router.use('/auth', authController);
router.use('/home', homePageController);
router.use('/inventory', inventoryController);
router.use('/billing', billingController);
router.use('/sales', salesController);
router.use('/user', userController);

module.exports = router;