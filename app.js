const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const DB = require("./config/connection");
const routerAuth = require("./routes/auth");
const app = express();
const port = process.env.port || 5000;
app.use(cookieParser());
app.use(express.json());
DB.connectDB();
app.use("/api", routerAuth);
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
