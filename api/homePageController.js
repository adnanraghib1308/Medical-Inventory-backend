const router = require("express").Router();
const bcrypt = require("bcryptjs");

// error
const HandledError = require('../error/handledError');

// helpers
const { asyncWrapper } = require('../helpers/utils')

// dao
const { isAuthenticated } = require("../helpers/auth");


const test = asyncWrapper(async (req, res) => {
  res.send({message: "this is our home page"});
});

router.get('/', isAuthenticated, test);

module.exports = router