const jwtToken = require("../helpers/jwtToken");

class auth {
  static isAuth = (req, res, next) => {
    if (!req.cookies._cks_ui)
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
        if (req.url != "/manager/me") {
          return res.status(401).json({
            status: "error",
            message: "you are not authorized",
          });
        }
        next();
        break;
      case "client":
        if (req.url != "/client/me") {
          return res.status(401).json({
            status: "error",
            message: "you are not authorized",
          });
        }
        next();
        break;
      case "livreur":
        if (req.url != "/livreur/me") {
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
