"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../controllers/task.controller");

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.post("/create", controller.create);
router.patch("/edit/:id", controller.edit);
router["delete"]("/delete/:id", controller["delete"]);
module.exports = router;