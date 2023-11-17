const express = require("express");
require("dotenv").config();
const database = require("./config/database");

database.connect();
