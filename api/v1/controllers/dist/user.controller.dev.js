"use strict";

var User = require("../models/user.model");

var md5 = require("md5");

var generate = require("../../../helpers/generate");

module.exports.register = function _callee(req, res) {
  var existEmail, infoUser, user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email,
            deleted: false
          }));

        case 2:
          existEmail = _context.sent;

          if (!existEmail) {
            _context.next = 6;
            break;
          }

          res.json({
            code: 400,
            message: "Email đã tồn tại!"
          });
          return _context.abrupt("return");

        case 6:
          infoUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
            token: generate.generateRandomString(30)
          };
          user = new User(infoUser);
          _context.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          token = user.token;
          res.cookie("token", token);
          res.json({
            code: 200,
            message: "Đăng ký thành công!",
            token: token
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};