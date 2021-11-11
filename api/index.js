const router = require("express").Router();

const authController = require('./authController');
const homePageController = require('./homePageController');
const inventoryController = require('./inventoryController');
const billingController = require('./billingController');
const salesController = require('./salesController');

router.use('/auth', authController);
router.use('/home', homePageController);
router.use('/inventory', inventoryController);
router.use('/billing', billingController);
router.use('/sales', salesController);

module.exports = router;