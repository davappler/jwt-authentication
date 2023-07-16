const User = require("../model/user");
require("dotenv").config();

const { registerHandler, loginHandler, updateHandler } = require("./handlers");

exports.register = async (req, res, next) => {
  registerHandler(req, res);
};

exports.login = async (req, res, next) => {
  loginHandler(req, res);
};

exports.update = async (req, res, next) => {
  updateHandler(req, res);
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.deleteOne())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
