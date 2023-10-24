const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const DB = require("./config/connection");
const routerAuth = require("./routes/auth");
const routerClient = require("./routes/auth.client");
const routerManager = require("./routes/auth.manager");
const routerLivreur = require("./routes/auth.livreur");
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
DB.connectDB();

app.use("/api/auth", routerAuth);
app.use("/api/user", routerClient);
app.use("/api/user", routerManager);
app.use("/api/user", routerLivreur);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
