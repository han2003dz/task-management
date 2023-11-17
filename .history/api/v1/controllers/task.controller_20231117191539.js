const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
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

  // pagination
  const countTasks = await Task.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 3,
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
  const tasks = await Task.find(find).sort(sort);

  console.log(tasks);
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
