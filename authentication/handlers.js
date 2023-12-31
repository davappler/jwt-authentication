const bcrypt = require("bcryptjs");
const User = require("../model/user");
require("dotenv").config();

const { createUser, generateJwtToken } = require("./helpers");

/**
 * Registers a user
 * @param {object} req The request object
 * @param {object} res The response object
 */
async function registerHandler(req, res) {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await createUser(username, hashedPassword, "admin");
    const maxAge = 3 * 60 * 60;
    const token = generateJwtToken(user, maxAge);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      message: "User successfully created",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "User not successful created",
      error: error.message,
    });
  }
}

/**
 * Logins a user
 * @param {object} req The request object
 * @param {object} res The response object
 */
async function loginHandler(req, res) {
  const { username, password } = req.body;
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
}

module.exports = {
  registerHandler,
  loginHandler,
};
