const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");

const md5 = require("md5");
const generate = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");

// [POST] /api/v1/users/register
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

  res.json({
    code: 200,
    message: "Đăng ký thành công!",
    token: token,
  });
};

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email chưa được đăng ký!",
    });
  }

  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu!",
    });
  }
  const token = user.token;
  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token,
  });
};

// [POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  // kiểm tra email tồn tại ?
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email chưa được đăng ký!",
    });
    return;
  }

  // lấy otp
  const otp = generate.generateRandomNumber(6);

  // xét thời gian nhập otp
  const timeExpire = 10;

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + timeExpire * 60,
  };

  // lưu vào database
  const forgotPassword = new ForgotPassword(objectForgotPassword);

  forgotPassword.save();

  // gửi otp qua email
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP để lấy lại mật khẩu của bạn là <b>${otp}</b> (Sử dụng trong ${timeExpire} phút).
    Vui lòng không chia sẻ mã OTP này với bất kỳ ai.
  `;
  sendMailHelper.sendMail(email, subject, html);

  res.json({
    code: 200,
    message: "Đã gửi mã otp để lấy lại mật khẩu thành công!",
  });
};

// [POST] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    res.json({
      code: 400,
      message:
        "Mã OTP không hợp lệ! Bạn cần kiểm tra lại mã OTP được gửi về email.",
    });
    return;
  }

  const user = await User.findOne({
    email: email,
  });

  // lưu vào cookie token của user
  res.cookie("token", user.token);

  res.json({
    code: 200,
    message: "Xác thực thành công!",
    token: user.token,
  });
};

module.exports.resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;

  const user = await User.findOne({
    token: token,
    deleted: false,
  });

  if(!user){
    res.json()
  }
};
