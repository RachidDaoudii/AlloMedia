const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwtToken = require("../helpers/jwtToken");
const auth = require("../middlewares/auth");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/forgetpassword", authController.sendEmailforgetpassword);

router.post(
  "/forgetpassworduser",
  jwtToken.verifyToken,
  authController.forgetpassword
);

router.post(
  "/resetpassword",
  auth.isAuth,
  jwtToken.verifyToken,
  authController.resetpassword
);

router.get(
  "/logout",
  [auth.isAuth, jwtToken.verifyToken],
  authController.logout
);

router.get(
  "/activationEmail/:email/:token",
  jwtToken.verifyToken,
  authController.activationEmail
);

module.exports = router;
