const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const jwtToken = require("../helpers/jwtToken");
const livreurController = require("../controllers/livreurController");

router.post(
  "/livreur/me",
  [auth.isAuth, jwtToken.verifyToken, auth.checkRole],
  livreurController.profileLivreur
);

module.exports = router;
