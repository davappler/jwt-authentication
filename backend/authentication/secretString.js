const crypto = require("crypto");
require("dotenv").config();

exports.generateSecret = () => {
  return crypto.randomBytes(Number(process.env.SECRET_LENGTH)).toString("hex");
};
// Used this function to generate a random string for secret
