"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var User = mongoose.model("User", userSchema, "users");
module.exports = User;