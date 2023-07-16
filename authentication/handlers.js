const bcrypt = require("bcryptjs");
require("dotenv").config();

const { createUser, generateJwtToken } = require("./helpers");

/**
 * Adds two numbers together.
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The next function in the middleware chain
 */
async function registerHandler(req, res, next) {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await createUser(username, hashedPassword);
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

module.exports = { registerHandler };
