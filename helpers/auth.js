const HandledError = require('../error/handledError');
const JWT = require('./jwt');
const { asyncWrapper } = require('./utils');

const isAuthenticated = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers['token'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) res.status(401).json({ messgae: "invalid token" });
  try {
    const user = JWT.validateJwt(token);
    if (!user) res.status(401).json({ messgae: "invalid token" });
    req.user = user;
  } catch (error) {
    throw new HandledError("Session expired please login again");
  }
  next();
})

module.exports = {isAuthenticated};