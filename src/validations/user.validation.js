const Joi = require("joi");
const { objectId, password, userName } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required().custom(userName),
    email: Joi.string().required().email(),
    location: Joi.string().allow(''),
    interest_Topics: Joi.string().allow(''),
    join_community: Joi.boolean(),
    image: Joi.string(),
    password: Joi.string().required().custom(password),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    filter: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      userName: Joi.string().required().custom(userName),
      email: Joi.string().required().email(),
      location: Joi.string().allow(''),
      interest_Topics: Joi.string().allow(''),
      join_community: Joi.boolean(),
      image: Joi.string(),
      password: Joi.string().required().custom(password),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
