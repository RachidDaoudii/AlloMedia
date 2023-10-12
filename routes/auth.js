const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  return res.send("testing route login");
});

router.post("/register", (req, res) => {
  return res.send("testing route register");
});

router.post("/forgetpassword", (req, res) => {
  return res.send("testing route forgetpassword");
});

router.post("/resetpassword/:token", (req, res) => {
  return res.send("testing route resetpassword with token");
});

module.exports = router;
