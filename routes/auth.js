const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwtToken = require("../helpers/jwtToken");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/resRegister");

router.post("/auth/login", authController.login);

router.post("/auth/register", validation.resRegister, authController.register);

router.post("/auth/forgetpassword", authController.forgetpassword);

router.post(
  "/auth/resetpassword",
  auth.isAuth,
  validation.resetpassword,
  authController.resetpassword
);

router.get(
  "/auth/logout",
  [auth.isAuth, jwtToken.verifyToken],
  authController.logout
);

router.get(
  "/auth/activationEmail/:email/:token",
  jwtToken.verifyToken,
  authController.activationEmail
);

// router.post("/auth/refreash", [jwtToken.RefreshToken]);

router.post(
  "/user/livreur",
  [auth.isAuth, jwtToken.verifyToken, auth.checkRole],
  authController.profilUser
);
router.post(
  "/user/manager",
  [auth.isAuth, jwtToken.verifyToken, auth.checkRole],
  authController.profilUser
);
router.post(
  "/user/client",
  [auth.isAuth, jwtToken.verifyToken, auth.checkRole],
  authController.profilUser
);

module.exports = router;
