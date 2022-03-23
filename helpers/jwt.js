const jwt = require("jsonwebtoken");
const config = require("../config");

const generateJwt = (user) => {
  return jwt.sign(user.toJSON(), config.jwtSecret, {
    expiresIn: 31556952, // 24 hours
  });
};

const validateJwt = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

module.exports = {
  generateJwt,
  validateJwt
};
