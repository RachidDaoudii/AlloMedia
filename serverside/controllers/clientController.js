const authController = require("./authController");

class clientController {
  static profileClient = (req, res) => {
    authController.profile(req, res);
  };
}

module.exports = clientController;
