const router = require("express").Router();

const authController = require('./authController');
const homePageController = require('./homePageController');

router.use('/auth', authController);
router.use('/home', homePageController);

module.exports = router;