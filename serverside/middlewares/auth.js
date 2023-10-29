const jwtToken = require("../helpers/jwtToken");

class auth {
  static isAuth = (req, res, next) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!token)
      return res.status(401).json({
        status: "error",
        message: "please login first",
      });
    next();
  };

  static checkRole = async (req, res, next) => {
    const token = req.cookies._cks_ui;
    const { user } = await jwtToken.decoded(token);
    switch (user.role.name) {
      case "manager":
        if (!req.originalUrl.startsWith("/api/user/manager")) {
          return res.status(401).json({
            status: "error",
            message: "you are not authorized",
          });
        }
        next();
        break;
      case "client":
        if (!req.originalUrl.startsWith("/api/user/client")) {
          return res.status(401).json({
            status: "error",
            message: "you are not authorized",
          });
        }
        next();
        break;
      case "livreur":
        if (!req.originalUrl.startsWith("/api/user/livreur")) {
          return res.status(401).json({
            status: "error",
            message: "you are not authorized",
          });
        }
        next();
        break;

      default:
        return res.status(401).json({
          status: "error",
          message: "you are not authorized",
        });
    }
  };
}

module.exports = auth;
