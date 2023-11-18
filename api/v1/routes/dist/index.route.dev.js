"use strict";

var taskRoutes = require("./task.route");

var userRoutes = require("./user.route");

module.exports = function (app) {
  var version = "/api/v1";
  app.use(version + "/tasks", taskRoutes);
  app.use(version + "/users", userRoutes);
};