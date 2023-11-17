const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  // bộ lọc trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }
  // end bộ lọc trạng thái

  // search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // end search

  // pagination
  const countTasks = await Task.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 2,
    },
    req.query,
    countTasks
  );
  // end pagination

  // sắp xếp theo tiêu chí
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  // end sắp xếp theo tiêu chí
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(task);
};

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const listStatus = ["initial", "finish", "doing", "unfinished"];
    const id = req.params.id;
    const status = req.body.status;
    if (listStatus.includes(status)) {
      await Task.updateOne(
        {
          _id: id,
        },
        { status: status }
      );
      res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công!",
      });
    } else {
      res.json({
        message: "Không tồn tại trạng thái này!",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật trạng thái không thành công!",
      error: error,
    });
  }
};

module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;
    switch (key) {
      case "status":
        await Task.updateMany({ _id: { $id: ids } }, { status: value });
        break;
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!",
        });
      default:
        break;
    }
    res.json({
      code: 200,
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật thất bại!",
      error: error,
    });
  }
};
