const roleModel = require("../models/roleModel");

class roleController {
  static getAllRole = async (req, res) => {
    try {
      const roles = await roleModel.getAll(req, res);
      if (!roles)
        return res.status(400).json({
          status: "error",
          message: "roles not found",
        });

      return res.status(201).json({
        status: "success",
        data: roles,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

module.exports = roleController;
