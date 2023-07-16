const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    await User.create({
      username,
      password: hashedPassword,
    }).then((user) => {
      const token = generateJwtToken(user);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      res.status(201).json({
        message: "User successfully created",
        user,
      });
    });
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: error.message,
    });
  }
};

/**
 * Adds two numbers together.
 * @param {object} user The user
 * @param {string} jwtSecret The jwtToken secret, default value is ENV variable
 * @param {int} maxAge The maxAge of token, by default it is 3 hours
 * @return {string} The token
 */
function generateJwtToken(
  user,
  jwtSecret = process.env.JWT_SECRET,
  maxAge = 3 * 60 * 60
) {
  const token = jwt.sign(
    { id: user._id, username, role: user.role },
    jwtSecret,
    {
      expiresIn: maxAge, // 3hrs in sec
    }
  );
  return token;
}

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
        const token = generateJwtToken(user);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
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
