const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const { adminAuth } = require("./middleware/admin/auth");
// const { userAuth } = require("./middleware/user/auth");

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

app.post("/testing-jwt", (req, res) => {
  const { jwtToken } = req.body;
  // I should be taking jwtToken from user's header

  jwt.verify(jwtToken, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      console.log("Token is not valid");
      return res
        .status(400)
        .json({ message: "Error verifying the token", error: true });
    }
    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
      console.log("token is expired");
      return res.status(400).json({ message: "token is expired" });
    } else {
      return res.status(200).json({ message: "token is valid" });
    }
  });
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
