const catchAsync = require("../utils/catchAsync");
const { httpStatus, message } = require("../utils/constant");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { userService, virtualImageServices } = require("../services");
const objectUtil = require("../utils/objectUtil");

const createImage = catchAsync(async (req, res) => {
  const image = await virtualImageServices.createImage(req.body);
  res.json(
    new ApiResponse(httpStatus.CREATED, message.SUCCESS, { image: image })
  );
});
const createRenovationImage = catchAsync(async (req, res) => {
  const image = await virtualImageServices.createRenovationImage(req.body);
  res.json(
    new ApiResponse(httpStatus.CREATED, message.SUCCESS, { image: image })
  );
});
const createMaskImage = catchAsync(async (req, res) => {
  const image = await virtualImageServices.createMaskImage(req.body);
  res.json(
    new ApiResponse(httpStatus.CREATED, message.SUCCESS, { image: image })
  );
});
const createMaskRenovationImage = catchAsync(async (req, res) => {
  const image = await virtualImageServices.createMaskRenovationImage(req.body);
  res.json(
    new ApiResponse(httpStatus.CREATED, message.SUCCESS, { image: image })
  );
});


module.exports = {
  createImage,
  createRenovationImage,
  createMaskImage,
  createMaskRenovationImage
};
