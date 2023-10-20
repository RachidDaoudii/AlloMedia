const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const jwtToken = require("../helpers/jwtToken");
const managerController = require("../controllers/managerController");

router.post(
  "/manager/profile",
  [auth.isAuth, jwtToken.verifyToken, auth.checkRole],
  managerController.profileManager
);

module.exports = router;
