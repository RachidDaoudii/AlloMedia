const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const DB = require("./config/connection");
const routerAuth = require("./routes/auth");
const routerClient = require("./routes/auth.client");
const routerManager = require("./routes/auth.manager");
const routerLivreur = require("./routes/auth.livreur");
const routerRole = require("./routes/auth.role");
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cookieParser());
DB.connectDB();

const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", routerAuth);
app.use("/api/user", routerClient);
app.use("/api/user", routerManager);
app.use("/api/user", routerLivreur);
app.use("/api/auth", routerRole);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
