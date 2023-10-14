const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const resRegister = require("../middlewares/resRegister");

router.post("/login", authController.login);

router.post("/register", resRegister, authController.register);

router.post("/forgetpassword", authController.forgetpassword);

router.post("/resetpassword/:token", authController.resetpassword);

router.post("/logout", authController.logout);

module.exports = router;
