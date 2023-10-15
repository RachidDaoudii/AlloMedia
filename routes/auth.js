const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const resRegister = require("../middlewares/resRegister");
const jwtToken = require("../helpers/jwtToken");
const auth = require("../middlewares/auth");

router.post("/login", authController.login);

router.post("/register", resRegister, authController.register);

router.post("/forgetpassword", auth.isAuth, authController.forgetpassword);

router.post("/resetpassword/:token", auth.isAuth, authController.resetpassword);

router.get("/logout", auth.isAuth, authController.logout);

router.get(
  "/activationEmail/:email/:token",
  jwtToken.verifyToken,
  authController.activationEmail
);

module.exports = router;
