const express = require("express");
require("dotenv").config();

const database = require("./config/database");
database.connect();

const routesVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

routesVer1(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
