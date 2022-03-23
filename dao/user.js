const User = require('../models/user');

const findOneUser = async (query) => {
  return await User.findOne(query);
}

const createNewUser = async (fields) => {
  return await User.create(fields);
}

const updateOneUser = async (query, updateFields) => {
  return await User.findOneAndUpdate(query, { $set: updateFields});
}

module.exports = {
  findOneUser,
  createNewUser,
  updateOneUser,
};