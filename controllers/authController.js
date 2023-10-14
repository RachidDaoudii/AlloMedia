require("dotenv").config();
const authRequest = require("../requests/authRequest");
const usermodel = require("../models/userModel");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class auth {
  static login = async (req, res) => {
    try {
      const result = authRequest.validateLogin(req);

      if (result.error)
        return res
          .status(400)
          .json({ status: "error", message: result.error.message });

      const user = await usermodel.findUser(req);

      const compare = await bycrpt.compare(req.body.password, user.password);

      if (!user || !compare)
        return res
          .status(400)
          .json({ status: "error", message: "email or password is wrong" });
      const token = jwt.sign({ _id: user._id }, process.env.PRIVATEKEY);
      const { username, email, role, created_at } = user;

      return res.status(201).json({
        status: "success",
        message: `Hi ${role.name} ${username}`,
        data: {
          username,
          email,
          role: role ? role.name : null,
          created_at,
        },
        token: token,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static register = async (req, res) => {
    try {
      // const result = authRequest.validateRegister(req);

      // if (result.error)
      //   return res
      //     .status(400)
      //     .json({ status: "error", message: result.error.message });

      const self = await bycrpt.genSalt(10);
      req.body.password = await bycrpt.hash(req.body.password, self);

      const user = await usermodel.createUser(req);

      if (user.keyValue)
        return res.status(400).json({
          status: "error",
          message: "email deja exist",
        });

      return res.status(201).json({
        status: "success",
        message: "user created",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static forgetpassword = async (req, res) => {
    return res.send("testing route forgetpassword");
  };

  static resetpassword = async (req, res) => {
    // console.log(req.params.token);
    return res.send("testing route resetpassword with token");
  };

  static logout = async (req, res) => {
    return res.send("testing route logout");
  };
}

module.exports = auth;
