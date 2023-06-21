const express = require("express");

const docsRoute = require("./doc.route");
const testRoute = require("./test.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const virtualImage = require("./virtualImage.route");
const router = express.Router();

router.use("/documentation", docsRoute);
router.use("/test", testRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/virtualimage", virtualImage);
module.exports = router;
