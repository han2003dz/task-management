const User = require("../models/user.model");
const md5 = require("md5");
const generate = require("../../../helpers/generate");
module.exports.register = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại!",
    });
    return;
  }

  const infoUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    token: generate.generateRandomString(30),
  };

  const user = new User(infoUser);
  await user.save();
  const token = user.token;
  res.cookie("token", token);
};
