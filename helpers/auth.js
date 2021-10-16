const JWT = require('./jwt');

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers['token'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) res.status(401).json({ messgae: "invalid token" });
  const user = JWT.validateJwt(token);
  if(!user) res.status(401).json({ messgae: "invalid token" });
  req.user = user;

  next();
}

module.exports = {isAuthenticated};