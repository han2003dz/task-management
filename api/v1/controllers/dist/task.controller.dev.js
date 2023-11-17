"use strict";

var Task = require("../models/task.model"); //[GET] /api/v1/tasks


module.exports.index = function _callee(req, res) {
  var find, sort, tasks;
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
          // sắp xếp theo tiêu chí


          sort = {};

          if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue;
          } // end sắp xếp theo tiêu chí


          _context.next = 6;
          return regeneratorRuntime.awrap(Task.find(find).sort(sort));

        case 6:
          tasks = _context.sent;
          res.json(tasks);

        case 8:
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