const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");

const database = require("./config/database");
database.connect();

const routesVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

app.use(bodyParser)

routesVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
