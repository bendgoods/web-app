const { httpStatus, message } = require("../utils/constant");
const { User } = require("../models/index");
const ApiError = require("../utils/ApiError");
const { default: axios } = require("axios");
const createImage = async (imageBody) => {
  // let requests = [];
  // for (let i = 0; i < 3; i++) {
  //   requests.push(
  //     axios.post('https://msmdv7dr5eomtmfxb44bvmhzsu0cgwgm.lambda-url.ap-southeast-1.on.aws', imageBody)
  //   )
  //   console.log(imageBody)
  // }
  // let res = []
  // try {
  //   let responses = await Promise.all(requests);
  //   responses.forEach((response, index) => {
  //     if (!response) {
  //       console.error(`Request ${index + 1} failed: Network Error`);
  //     } else {
  //       console.log(`Response from request ${index + 1}:`, response.data.body);
  //       res.push(response.data.body)
  //     }
  //   });
  //   return res;
  // } catch (error) {
  //   console.error("Network error: ", error);
  // }
  try {
    console.log(imageBody);

    let image = await axios.post(
      "https://msmdv7dr5eomtmfxb44bvmhzsu0cgwgm.lambda-url.ap-southeast-1.on.aws",
      imageBody
    );
    if (!image) {
      throw new ApiError(httpStatus.NOT_FOUND, "Network Error");
    }

    return image.data.body;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createImage,
};
const createRenovationImage = async (imageBody) => {
  try {
    console.log(imageBody);
    let image = await axios.post(
      "https://cmlmki3pt5uiqbloogxhryyjvy0toixo.lambda-url.ap-southeast-1.on.aws/",
      imageBody
    );
    if (!image) {
      throw new ApiError(httpStatus.NOT_FOUND, "Network Error");
    }

    return image.data.body;
  } catch (err) {
    console.log(err);
  }
};
const createMaskImage = async (imageBody) => {
  try {
    console.log(imageBody);
    let image = await axios.post(
      "https://k3w62ldfqxtlu4urjqdkfwzr4a0hfdae.lambda-url.ap-southeast-1.on.aws/",
      imageBody
    );
    if (!image) {
      throw new ApiError(httpStatus.NOT_FOUND, "Network Error");
    }
    return image.data;
  } catch (err) {
    console.log(err);
  }
};
const createMaskRenovationImage = async (imageBody) => {
  try {
    console.log(imageBody);
    let image = await axios.post(
      "https://k3w62ldfqxtlu4urjqdkfwzr4a0hfdae.lambda-url.ap-southeast-1.on.aws/",
      imageBody
    );
    if (!image) {
      throw new ApiError(httpStatus.NOT_FOUND, "Network Error");
    }
    return image.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createImage,
  createRenovationImage,
  createMaskImage,
  createMaskRenovationImage,
};
