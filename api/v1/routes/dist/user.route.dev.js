"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../controllers/user.controller");

router.post("/register", controller.register);
module.exports = router;