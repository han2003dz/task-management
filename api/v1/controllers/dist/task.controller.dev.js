"use strict";

var Task = require("../models/task.model");

var paginationHelper = require("../../../helpers/pagination");

var searchHelper = require("../../../helpers/search"); //[GET] /api/v1/tasks


module.exports.index = function _callee(req, res) {
  var find, objectSearch, countTasks, objectPagination, sort, tasks;
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
          // search


          objectSearch = searchHelper(req.query);

          if (objectSearch.regex) {
            find.title = objectSearch.regex;
          } // end search
          // pagination


          _context.next = 6;
          return regeneratorRuntime.awrap(Task.countDocuments(find));

        case 6:
          countTasks = _context.sent;
          objectPagination = paginationHelper({
            currentPage: 1,
            limitItems: 2
          }, req.query, countTasks); // end pagination
          // sắp xếp theo tiêu chí

          sort = {};

          if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue;
          } // end sắp xếp theo tiêu chí


          _context.next = 12;
          return regeneratorRuntime.awrap(Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip));

        case 12:
          tasks = _context.sent;
          res.json(tasks);

        case 14:
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
}; // [PATCH] /api/v1/tasks/change-status/:id


module.exports.changeStatus = function _callee3(req, res) {
  var listStatus, id, status;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          listStatus = ["initial", "finish", "doing", "unfinished"];
          id = req.params.id;
          status = req.body.status;

          if (!listStatus.includes(status)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(Task.updateOne({
            _id: id
          }, {
            status: status
          }));

        case 7:
          res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
          });
          _context3.next = 11;
          break;

        case 10:
          res.json({
            message: "Không tồn tại trạng thái này!"
          });

        case 11:
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.json({
            code: 400,
            message: "Cập nhật trạng thái không thành công!",
            error: _context3.t0
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};