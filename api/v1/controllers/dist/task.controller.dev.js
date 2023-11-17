"use strict";

var Task = require("../models/task.model"); //[GET] /api/v1/tasks


module.exports.index = function _callee(req, res) {
  var find, tasks;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          find = {
            deleted: false
          }; // bộ lọc trạng thái

          if (req.query.status) {
            find.status = req.query.status;
          } // end bộ lọc trạng thái


          _context.next = 4;
          return regeneratorRuntime.awrap(Task.find(find));

        case 4:
          tasks = _context.sent;
          res.json(tasks);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [GET] /api/v1/tasks/detail/:id


module.exports.detail = function _callee2(req, res) {
  var id, task;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Task.findOne({
            _id: id,
            deleted: false
          }));

        case 3:
          task = _context2.sent;
          res.json(task);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};