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
          listStatus = ["initial", "finish", "doing", "unfinished", "pending"];
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
}; // [PATCH] /api/v1/tasks/change-multi


module.exports.changeMulti = function _callee4(req, res) {
  var _req$body, ids, key, value;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, ids = _req$body.ids, key = _req$body.key, value = _req$body.value;
          _context4.t0 = key;
          _context4.next = _context4.t0 === "status" ? 5 : 9;
          break;

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(Task.updateMany({
            _id: {
              $in: ids
            }
          }, {
            status: value
          }));

        case 7:
          res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
          });
          return _context4.abrupt("break", 11);

        case 9:
          res.json({
            code: 400,
            message: "Không tồn tại!"
          });
          return _context4.abrupt("break", 11);

        case 11:
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t1 = _context4["catch"](0);
          res.json({
            code: 400,
            message: "Cập nhật thất bại!",
            error: _context4.t1
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // [POST] /api/v1/tasks/create


module.exports.create = function _callee5(req, res) {
  var task, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          task = new Task(req.body);
          _context5.next = 4;
          return regeneratorRuntime.awrap(task.save());

        case 4:
          data = _context5.sent;
          res.json({
            code: 200,
            message: "Tạo thành công!",
            data: data
          });
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.json({
            code: 400,
            message: "Tạo không thành công!",
            error: _context5.t0
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // [POST]/api/v1/tasks/edit/:id


module.exports.edit = function _callee6(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Task.updateOne({
            _id: id
          }, req.body));

        case 4:
          res.json({
            code: 200,
            message: "Cập nhật thành công!"
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.json({
            code: 400,
            message: "Lỗi!"
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // [POST]/api/v1/tasks/delete/:id


module.exports["delete"] = function _callee7(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          console.log(id);
          _context7.next = 5;
          return regeneratorRuntime.awrap(Task.updateOne({
            _id: id
          }, {
            deleted: true,
            deletedAt: new Date()
          }));

        case 5:
          res.json({
            code: 200,
            message: "Xóa thành công!"
          });
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.json({
            code: 400,
            message: "Xóa thất bại!",
            error: _context7.t0
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};