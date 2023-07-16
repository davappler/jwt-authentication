const User = require("../model/user");
require("dotenv").config();

const { registerHandler, loginHandler } = require("./handlers");

exports.register = async (req, res, next) => {
  registerHandler(req, res);
};

exports.login = async (req, res, next) => {
  loginHandler(req, res);
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    if (role === "admin") {
      await User.findById(id)
        .then((user) => {
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
            });
          }
          res.status(201).json({ message: "Update successful", user });
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } else {
      res.status(400).json({ message: "User is already an Admin" });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
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
