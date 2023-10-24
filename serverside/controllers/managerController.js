const authController = require("./authController");

class managerController {
  static profileManager = (req, res) => {
    authController.profile(req, res);
  };
}

module.exports = managerController;
