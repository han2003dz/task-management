module.exports.requireAuth = async (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.
  }
  console.log(req.headers.authorization);
  next();
};
