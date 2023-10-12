const express = require("express");
const routerAuth = require("./routes/auth");
const app = express();
app.use(express.json());

app.use("/api/auth", routerAuth);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
