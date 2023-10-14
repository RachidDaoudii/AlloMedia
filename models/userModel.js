const mongoose = require("mongoose");
const roleModel = require("./roleModel");
const role = mongoose.model("Role", roleModel.roleSchema);
class userModel {
  static userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: "65290ffdc5731b590f352acf",
    },
    created_at: { type: Date, default: Date.now },
  });

  static User = mongoose.model("User", userModel.userSchema);

  static createUser = async (req, res) => {
    try {
      const user = new userModel.User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();
      return user;
    } catch (err) {
      return err;
    }
  };

  static findUser = async (req, res) => {
    try {
      const user = await userModel.User.findOne({
        email: req.body.email,
      }).populate("role");
      return user;
    } catch (error) {
      return error;
    }
  };
}

module.exports = userModel;
