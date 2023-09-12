const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

/**
 * Adds two numbers together.
 * @param {string} username The username
 * @param {string} hashedPassword The maxAge of token, by default it is 3 hours
 * @param {string} role The role of the user
 * @return {object} The created user
 */
async function createUser(username, hashedPassword, role = "Basic") {
  const user = await User.create({
    username: username,
    password: hashedPassword,
    role: role,
  });

  return user;
}

/**
 * Generates a JWT token
 * @param {object} user The user
 * @param {int} maxAge The maxAge of token, by default it is 3 hours
 * @param {string} jwtSecret The jwtToken secret, default value is ENV variable
 * @return {string} The token
 */
function generateJwtToken(
  user,
  maxAge = 3 * 60 * 60,
  jwtSecret = process.env.JWT_SECRET
) {
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    jwtSecret,
    { expiresIn: maxAge }
  );

  return token;
}

module.exports = { createUser, generateJwtToken };
