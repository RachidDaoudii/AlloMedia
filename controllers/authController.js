const bycrpt = require("bcryptjs");
const authRequest = require("../requests/authRequest");
const usermodel = require("../models/userModel");
const jwtToken = require("../helpers/jwtToken");
const mailer = require("../helpers/mailer");

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

      const token = await jwtToken.generateToken(user);
      res.cookie("_gcl_au", token, { httpOnly: true });

      const { username, email, role, created_at, verified } = user;

      if (!verified) {
        await mailer.sendEmail(username, email, token);
        return res.status(400).json({
          status: "success",
          message: "please verify your email",
        });
      }

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

  static activationEmail = async (req, res) => {
    req.body.email = req.params.email;
    try {
      const user = await usermodel.findUser(req);
      if (!user)
        return res.status(400).json({
          status: "error",
          message: "user not found",
        });

      await usermodel.updateUser(req);
      return res.status(201).json({
        status: "success",
        message: "Verification successful",
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

module.exports = auth;
