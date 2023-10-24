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
      if (!user)
        return res
          .status(400)
          .json({ status: "error", message: "email or password is wrong" });

      const compare = await this.comparePassword(
        req.body.password,
        user.password
      );

      if (!compare)
        return res
          .status(400)
          .json({ status: "error", message: "email or password is wrong !!!" });

      const { username, email, verified, _id, role } = user;
      const token = await jwtToken.generateToken({
        username,
        email,
        verified,
        _id,
        role: role,
      });

      // await this.isEmailVerfied(user, res);
      if (user && user.verified) {
        res.cookie("_cks_ui", token, { httpOnly: true });
        return res.status(201).json({
          status: "sucess",
          message: "login success",
          data: {
            username,
            email,
            verified,
            _id,
            role: role,
            token: token,
          },
        });
      } else {
        const subject = "Activation Email";
        await mailer.sendEmail(username, email, token, subject);
        return res.status(400).json({
          status: "error",
          message: "please verify your email",
        });
      }
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  };

  static register = async (req, res) => {
    try {
      const result = authRequest.validateRegister(req);

      if (result.error)
        return res
          .status(400)
          .json({ status: "error", message: result.error.message });

      req.body.password = await this.hashPassword(req.body.password);

      const _role = await rolemodel.getRole(req);
      req.body.role = _role._id;
      const user = await usermodel.createUser(req);

      // console.log(user);

      const { username, email, verified, _id, role } = user;
      const token = await jwtToken.generateToken({
        username,
        email,
        verified,
        _id,
        role: role,
      });

      if (user.keyValue)
        return res.status(400).json({
          status: "error",
          message: "email already exists",
        });

      const subject = "Activation Email";
      await mailer.sendEmail(username, email, token, subject);

      return res.status(201).json({
        status: "success",
        message: "please verify your email",
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
    const token = req.params.token;
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

  static profile = async (req, res, next) => {
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

  static sendEmailforgetpassword = async (req, res) => {
    const result = authRequest.validateForgetpassword(req);

    if (result.error)
      return res
        .status(400)
        .json({ status: "error", message: result.error.message });

    const user = await usermodel.findUserbyEmail(req);
    if (!user)
      return res.status(400).json({
        status: "error",
        message: "user not found",
      });
    const { username, email, _id, verified } = user;

    const token = await jwtToken.generateToken({
      username,
      email,
      _id,
      verified,
    });
    const subject = "Forget Password";
    await mailer.sendEmail(username, email, token, subject);

    return res.status(201).json({
      status: "success",
      message: "please check your email",
    });
  };

  static resetpassword = async (req, res) => {
    try {
      const result = authRequest.validateResetpassword(req);

      if (result.error)
        return res
          .status(400)
          .json({ status: "error", message: result.error.message });

      // const gettoken = req.cookies._cks_ui;
      const gettoken = req.cookies && req.cookies._cks_ui;
      const user = await jwtToken.decoded(gettoken);
      if (!user || !user.user)
        return res.status(400).json({
          status: "error",
          message: "user not found !!!",
        });

      const { _id, email } = user.user;
      req.body._id = _id;
      req.body.email = email;
      const getUser = await usermodel.findUserbyEmail(req);

      if (!getUser)
        return res.status(400).json({
          status: "error",
          message: "user not found",
        });

      const { password } = getUser;
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

  static forgetpassword = async (req, res) => {
    const token = req.params.token;
    const user = await jwtToken.decoded(token);
    if (!user)
      return res.status(400).json({
        status: "error",
        message: "user not found",
      });

    const { _id, email } = user.user;
    req.body.email = email;
    const _user = await usermodel.findUserbyEmail(req);

    if (!_user)
      return res.status(400).json({
        status: "error",
        message: "user not found",
      });

    const hash = await this.hashPassword(req.body.password);
    req.body._id = _id;
    req.body.new_password = hash;
    await usermodel.upadatePAssword(req);

    return res.status(201).json({
      status: "success",
      message: "password updated",
    });
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

  static isEmailVerfied = async (user, res) => {
    if (!user.verified) {
      const subject = "Activation Email";
      await mailer.sendEmail(user.username, user.email, user.token, subject);
      return res.status(400).json({
        status: "success",
        message: "please verify your email",
      });
    }
    return true;
  };
}

module.exports = auth;
