const router = require('express').Router();

// helpers
const { asyncWrapper } = require("../helpers/utils");

// dao
const UserDAO = require('../dao/user');
const {isAuthenticated} = require("../helpers/auth");

const getUserData = asyncWrapper(async (req, res) => {
  const user = await UserDAO.findOneUser({_id: req.user._id});
  res.sendformat({data: user});
});

const updateUserData = asyncWrapper(async (req, res) => {
  const user = req.body;
  await UserDAO.updateOneUser({_id: req.user._id}, user);
  res.sendformat({message: "success"});
})

router.get('/', isAuthenticated, getUserData);
router.post('/', isAuthenticated, updateUserData);

module.exports = router;