const Task = require("../models/task.model");

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const tasks = await Task.find({
    deleted: false,
  });

  res.json(tasks);
};


