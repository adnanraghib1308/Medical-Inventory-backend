const jwt = require("jsonwebtoken");

const generateJwt = (user) => {
  return jwt.sign(user.toJSON(), "sdfasdfa", {
    expiresIn: 31556952, // 24 hours
  });
};

const validateJwt = (token) => {
  return jwt.verify(token, "sdfasdfa");
};

module.exports = {
  generateJwt,
  validateJwt
};
