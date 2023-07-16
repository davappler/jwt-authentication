const User = require("../model/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { registerHandler } = require("./handlers");
const { generateJwtToken } = require("./helpers");

exports.register = async (req, res, next) => {
  registerHandler(req, res);
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const maxAge = 3 * 60 * 60;
        const token = generateJwtToken(user, maxAge);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(201).json({
          message: "User successfully Logged in",
          user: user._id,
        });
      } else {
        res.status(400).json({ message: "Login not succesful" });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
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
