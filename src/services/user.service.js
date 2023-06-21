const { httpStatus, message } = require("../utils/constant");
const { User } = require("../models/index");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { error } = require("winston");
const ApiResponse = require("../utils/ApiResponse");
const createUser = async (userBody) => {
  let user = await User.findOne({ email: userBody.email });
  if (user) {
    if (user.email === userBody.email) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.Duplicate);
    }
  }
  user = new User(
    _.pick(userBody, [
      "firstName",
      "lastName",
      "userName",
      "email",
      "location",
      "interest_Topics",
      "join_community",
      "image",
      "password"
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(userBody.password, salt);
  console.log(user);
  user = await user.save();
  user = await user.save();
  return user;
};
const isPasswordMatch = async function (password, userId) {
  const user = await User.findById(userId);
  console.log(userId);
  return await bcrypt.compare(password, user.password);
};

const queryUsers = async (filter, options) => {
  const users = await User.findOne();
  return users;
};

const getUserById = async (userId) => {
  console.log(userId);
  let user = await User.findOne({
    _id: userId,
  });
  return user;
};

const updateUserById = async (userId, userBody) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  const user1 = await User.findByIdAndUpdate(
    userId,
    _.pick(userBody, [
      "firstName",
      "lastName",
      "userName",
      "email",
      "location",
      "interest_Topics",
      "join_community",
      "image",
    ]),
    {
      new: true,
    }
  );
  return user1;
};

const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  return user;
};

const gatUserByEmail = async (email) => {
  console.log(email);
  let users = await User.findOne({ email: email });
  if (!users) {
    throw new ApiError(httpStatus.BAD_REQUEST, message.INVALID_CREDENTIALS)
  }
  return users;
};
const getUserByUserName = async (userName) => {
  let user = await User.findOne({
    userName: userName,
  });
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByUserName,
  gatUserByEmail,
  isPasswordMatch
};
