const router = require("express").Router();
const bcrypt = require("bcryptjs");

// error
const HandledError = require('../error/handledError');

// helpers
const { asyncWrapper } = require('../helpers/utils')
const JWT = require('../helpers/jwt');

// dao
const UserDao = require('../dao/user');

const signInUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  
  // check if user is already registered or not
  const user = await UserDao.findOneUser({ email });
  if(!user) throw new HandledError("No User found with this email");

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if(!isValidPassword) throw new HandledError("Invalid Password");

  const token = JWT.generateJwt(user);

  res.sendformat({ user, token });
});

const signUpUser = asyncWrapper(async (req, res) => {
  const { first_name: firstName, last_name: lastName, email, password } = req.body;
  if(!firstName || !lastName || !email || !password) throw new HandledError("Please provide all values");

  // encrypt the password
  const encrytPassword = bcrypt.hashSync(password, 8);

  // check if user already exist with this email
  const user = await UserDao.findOneUser({ email });

  if(user) throw new HandledError("User already exist with this email");

  // create new User with given details
  await UserDao.createNewUser({
    first_name: firstName,
    last_name: lastName,
    email,
    password: encrytPassword,
    role: 'user'
  })

  res.sendformat({message: "Success"});
})

router.post('/signup', signUpUser);
router.post('/signin', signInUser);

module.exports = router