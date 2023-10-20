const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const jwtToken = require("../helpers/jwtToken");
const clientController = require("../controllers/clientController");

router.post(
  "/client/profile",
  [auth.isAuth, jwtToken.verifyToken, auth.checkRole],
  clientController.profileClient
);

module.exports = router;
