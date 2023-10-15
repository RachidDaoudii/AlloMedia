const mongoose = require("mongoose");

class roleModel {
  static roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  });

  static Role = mongoose.model("Role", roleModel.roleSchema);

  static createRole = async (req, res) => {
    try {
      const role = new Schema.Role({
        name: req.body.name,
      });

      await role.save();
      console.log("Role was created successfully");
    } catch (err) {
      console.error(err);
    }
  };

  static getRole = async (req, res) => {
    try {
      const role = await roleModel.Role.findOne({
        name: req.body.role,
      });
      return role;
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "role not found",
      });
    }
  };
}

module.exports = roleModel;
