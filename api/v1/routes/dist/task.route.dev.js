"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../controllers/task.controller");

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id", controller.changeStatus);
module.exports = router;