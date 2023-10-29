const mongoose = require("mongoose");

class userModel {
  static userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      default: null,
    },
    adress: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    created_at: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
  });

  static User = mongoose.model("User", this.userSchema);

  static createUser = async (req, res) => {
    try {
      const user = new this.User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body._role,
      });

      await user.save();
      return user;
    } catch (err) {
      return err;
    }
  };

  static findUserbyEmail = async (req, res) => {
    try {
      const user = await this.User.findOne({
        email: req.body.email,
      }).populate("role");

      return user;
    } catch (error) {
      return error;
    }
  };

  static updateUser = async (req, res) => {
    try {
      const user = await this.User.updateOne(
        {
          email: req.body.email,
        },
        {
          $set: {
            verified: true,
          },
        }
      );
      return user;
    } catch (error) {
      return error;
    }
  };

  static upadatePAssword = async (req) => {
    try {
      const user = await this.User.updateOne(
        {
          _id: req.body._id,
        },
        {
          $set: {
            password: req.body.new_password,
          },
        }
      );
      return user;
    } catch (error) {
      return error;
    }
  };
}

module.exports = userModel;
