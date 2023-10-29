const mongoose = require("mongoose");

class DB {
  static connectDB = async () => {
    try {
      // await mongoose.connect(
      //   "mongodb+srv://rachid:rachid1234567890@cluster0.4k3tkhp.mongodb.net/alloMedia?retryWrites=true&w=majority"
      // );
      await mongoose.connect(process.env.DATABASE_URL);
      // mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority
      console.log("Connected to MongoDB...");
    } catch (error) {
      console.error("Could not connect to MongoDB:", error);
    }
  };
}
module.exports = DB;
