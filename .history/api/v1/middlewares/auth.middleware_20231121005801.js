module.exports.requireAuth = async (req, res, next) => {
  console.log(req.headers);
  next();
};
