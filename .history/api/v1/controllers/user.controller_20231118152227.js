const User = require("../models/user.model");
const md5 = require("md5");
const generate = require("../../../helpers/generate");
module.exports.register = async (req, res) => {
  const existEmail = await User.findOne({
    
  })
};
