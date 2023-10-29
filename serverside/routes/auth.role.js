const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const jwtToken = require("../helpers/jwtToken");
const auth = require("../middlewares/auth");

router.get("/roles", roleController.getAllRole);

module.exports = router;
