class auth {
  static isAuth = (req, res, next) => {
    if (!req.cookies._cks_ui)
      return res.status(401).json({
        status: "error",
        message: "please login first",
      });
    next();
  };
}

module.exports = auth;
