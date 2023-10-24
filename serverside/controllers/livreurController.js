const authController = require("./authController");

class livreurController {
  static profileLivreur = (req, res) => {
    authController.profile(req, res);
  };
}

module.exports = livreurController;
