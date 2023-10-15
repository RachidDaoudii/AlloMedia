const jwt = require("jsonwebtoken");

class jwtToken {
  static generateToken = async (user) => {
    const token = await jwt.sign({ _id: user._id }, process.env.PRIVATEKEY, {
      expiresIn: "10m",
    });

    return token;
  };

  static verifyToken = async (req, res, next) => {
    try {
      const token = req.params.token || req.body.token;
      const decoded = await jwt.verify(token, process.env.PRIVATEKEY);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

module.exports = jwtToken;
