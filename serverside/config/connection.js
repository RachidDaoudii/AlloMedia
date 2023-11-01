const mongoose = require("mongoose");

class DB {
  static connectDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URLAtlass);
      console.log("Connected to MongoDB...");
    } catch (error) {
      console.error("Could not connect to MongoDB:", error);
    }
  };
}
module.exports = DB;
