const express = require("express");
require("dotenv").config();

const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT;


