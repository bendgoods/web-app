const express = require("express");
const validate = require("../middlewares/validate");
const { virtualImageValidation } = require("../validations");
const { virtualImageController } = require("../controllers");
const validateApiKey = require("../middlewares/validateApi");
const router = express.Router();

router
  .route("/")
  .post(
    validate(virtualImageValidation.createImage), validateApiKey,
    virtualImageController.createImage
  );
router
  .route("/renovation")
  .post(
    validate(virtualImageValidation.createRenovationImage), validateApiKey,
    virtualImageController.createRenovationImage
  );
router
  .route("/mask")
  .post(
    validate(virtualImageValidation.createMaskImage), validateApiKey,
    virtualImageController.createMaskImage
  );
router
  .route("/mask/renovation")
  .post(
    validate(virtualImageValidation.createMaskRenovationImage), validateApiKey,
    virtualImageController.createMaskRenovationImage
  );
module.exports = router;
