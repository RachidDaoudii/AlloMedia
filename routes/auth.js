const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const resRegister = require("../middlewares/resRegister");
const jwtToken = require("../helpers/jwtToken");

router.post("/login", authController.login);

router.post("/register", resRegister, authController.register);

router.post("/forgetpassword", authController.forgetpassword);

router.post("/resetpassword/:token", authController.resetpassword);

router.post("/logout", authController.logout);

router.get(
  "/activationEmail/:email/:token",
  jwtToken.verifyToken,
  authController.activationEmail
);

module.exports = router;
