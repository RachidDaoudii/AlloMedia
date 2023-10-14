const authRequest = require("../requests/authRequest");

const resRegister = (req, res, next) => {
  const result = authRequest.validateRegister(req);

  if (result.error)
    return res
      .status(400)
      .json({ status: "error", message: result.error.message });
  next();
};

module.exports = resRegister;
