const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const multer = require('multer');

exports.logIn = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findUsername(req.body.Username);
    if (!user) return res.status(400).json({ message: 'Incorrect username.' });
    const isMatch = await bcrypt.compare(req.body.Password.toString(), user.Password.toString());
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });
    const token = jwt.sign({ userId: user._id }, 'secret-key');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.register = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    await userService.create(req.body);
    const token = jwt.sign({ userId: userService._id }, 'secret-key');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.add = async (req, res, next) => {
  try {
    console.log(req.body);
    const userService = new UserService(MongoDB.client);
    const doc = await userService.add(req.body);
    return res.send(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logInForAdmin = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findAdmin(req.body.Username);
    if (!user) return res.status(400).json({ message: 'Incorrect username.' });
    const isMatch = await bcrypt.compare(req.body.Password.toString(), user.Password.toString());
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });
    const token = jwt.sign({ userId: user._id }, 'secret-key');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logOut = async (req, res) => {
  await res.clearCookie('jwt');
  res.json({ message: 'User logged out successfully' });
};


exports.getInfo = async (req, res, next) => {
  const token = req.headers.authorization; // Lấy token từ header
  console.log(token);
  try {
    const decoded = jwt.decode(token); // Giải mã token
    console.log(decoded);
    const userService = new UserService(MongoDB.client);
    const user = await userService.findById(decoded.userId); // Lấy thông tin người dùng từ MongoDB
    res.json(user); // Trả về thông tin người dùng
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

exports.updateInfo = async (req, res, next) => {
  const token = req.headers.authorization; // Lấy token từ header
  try {
    const decoded = jwt.decode(token); // Giải mã token
    const userService = new UserService(MongoDB.client);
    const updateUser = await userService.update(decoded.userId, req.body); // Cập nhật thông tin người dùng trong MongoDB
    if (!updateUser) {
      return next(new ApiError(404, "Cập nhật thông tin thất bại."));
    } else return res.send({ message: 'Cập nhật thông tin thành công.' });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const doc = await userService.delete(req.params);
    if (!doc) {
      return next(new ApiError(404, "Không tìm thấy nhân viên."));
    }
    return res.send({ message: "Đã xóa thông tin nhân viên." });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Lỗi trong quá trình xóa thông tin nhân viên có Id = ${req.params.id}`
      )
    );
  }
};

exports.findEmployee = async (req, res, next) => {
  let docs = [];
  try {
    const userService = new UserService(MongoDB.client);
    const { userId } = req.query;
    if (userId) {
      docs = await userService.findById(userId);
    } else {
      docs = await userService.findEmployee();
    }
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong quá trình tìm kiếm.")
    );
  }
  return res.send(docs);
};