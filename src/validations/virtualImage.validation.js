const Joi = require("joi");
const { objectId, password, userName } = require("./custom.validation");

const createImage = {
  body: Joi.object().keys({
    room_type: Joi.string().required(),
    image_url: Joi.string().required(),
    architecture_style: Joi.string()
  }),
};
module.exports = {
  createImage,
};
const createRenovationImage = {
  body: Joi.object().keys({
    room_type: Joi.string().required(),
    image_url: Joi.string().required(),
  }),
};
const createMaskImage = {
  body: Joi.object().keys({
    image_url: Joi.string().required(),
    room_object: Joi.string().required(),
    room_type: Joi.string().required(),
    material_type: Joi.string(),
    color_theme: Joi.string(),
    return_mask: true

  }),
};
const createMaskRenovationImage = {
  body: Joi.object().keys({
    image_url: Joi.string().required(),
    mask_url: Joi.string().required(),
    room_object: Joi.string().required(),
    room_type: Joi.string().required(),
    material_type: Joi.string(),
    color_theme: Joi.string(),
  }),
};

module.exports = {
  createImage,
  createRenovationImage,
  createMaskImage,
  createMaskRenovationImage
};
