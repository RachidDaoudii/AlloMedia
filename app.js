const express = require("express");
const DB = require("./config/connection");
const routerAuth = require("./routes/auth");
const app = express();
const port = 3000;
app.use(express.json());
DB.connectDB();
app.use("/api/auth", routerAuth);
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
