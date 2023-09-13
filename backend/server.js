const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const { adminAuth } = require("./middleware/admin/auth");
// const { userAuth } = require("./middleware/user/auth");
// const authenticateToken = require("./middleware/authenticateToken");

// Connecting the Database
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
// credentials: true is added for cookies to be set in the user's browser
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const PORT = 5001;

app.get("/", (req, res) => {
  res.send({ message: "Hello World! hahahha" });
});

app.use("/api/auth", require("./authentication/routes"));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token is not valid");
      return res
        .status(403)
        .json({ message: "Error verifying the token", error: true });
    }

    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
      console.log("token is expired");
      return res.status(403).json({ message: "token is expired" });
    } else {
      // Add the decoded information to the request object
      req.user = decoded;
      next();
    }
  });
};

app.get("/books", authenticateToken, (req, res) => {
  res.json({
    books: ["Book one", "Book two", "Book one", "Book three", "Book four"],
  });
});

app.get("/get-user-email", authenticateToken, (req, res) => {
  const username = req.user.username;
  return res.status(200).json({ username });
});

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

// app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
// app.get("/basic", userAuth, (req, res) => res.send("User Route"));
