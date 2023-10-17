const bycrpt = require("bcryptjs");
const authRequest = require("../requests/authRequest");
const usermodel = require("../models/userModel");
const rolemodel = require("../models/roleModel");
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

      const user = await usermodel.findUserbyEmail(req);
      const compare = await this.comparePassword(
        req.body.password,
        user.password
      );

      if (!user || !compare)
        return res
          .status(400)
          .json({ status: "error", message: "email or password is wrong" });

      const { username, email, verified } = user;
      const token = await jwtToken.generateToken(user);
      if (!verified) {
        await mailer.sendEmail(username, email, token);
        return res.status(400).json({
          status: "success",
          message: "please verify your email",
        });
      }

      res.cookie("_cks_ui", token, { httpOnly: true });
      return res.status(201).json({
        status: "success",
        message: `Bonjour ${username}`,
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
      req.body.password = await this.hashPassword(req.body.password);

      const role = await rolemodel.getRole(req);
      req.body.role = role._id;
      const user = await usermodel.createUser(req);

      if (user.keyValue)
        return res.status(400).json({
          status: "error",
          message: "email deja exist",
        });

      return res.status(201).json({
        status: "success",
        message: "user created",
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static activationEmail = async (req, res) => {
    req.body.email = req.params.email;
    try {
      const user = await usermodel.findUserbyEmail(req);
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

  static profilUser = async (req, res, next) => {
    try {
      const token = req.cookies._cks_ui;
      const user = await jwtToken.decoded(token);
      if (!user)
        return res.status(400).json({
          status: "error",
          message: "user not found",
        });
      const { username, role } = user.user;
      return res.status(201).json({
        status: "success",
        message: `Bonjour ${username}, votre rôle est : ${
          role ? role.name : null
        }`,
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
    try {
      const gettoken = req.cookies._cks_ui;
      const user = await jwtToken.decoded(gettoken);
      if (!user)
        return res.status(400).json({
          status: "error",
          message: "user not found",
        });

      const { _id, password } = user.user;
      req.body._id = _id;

      const compare = await this.comparePassword(
        req.body.old_password,
        password
      );

      if (!compare)
        return res.status(400).json({
          status: "error",
          message: "old password is wrong",
        });

      const hash = await this.hashPassword(req.body.new_password);
      req.body.new_password = hash;

      await usermodel.upadatePAssword(req);

      return res.status(201).json({
        status: "success",
        message: "password updated",
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static logout = async (req, res) => {
    res.clearCookie("_cks_ui");
    return res.status(200).json({
      status: "success",
      message: "logout successfully",
    });
  };

  static hashPassword = async (_password) => {
    const self = await bycrpt.genSalt(10);
    const password = await bycrpt.hash(_password, self);
    return password;
  };

  static comparePassword = async (password_compare, password) => {
    const compare = await bycrpt.compare(password_compare, password);
    return compare;
  };
}

module.exports = auth;
