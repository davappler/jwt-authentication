const express = require("express");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const { adminAuth } = require("./middleware/admin/auth");
const { userAuth } = require("./middleware/user/auth");

// Connecting the Database
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 5001;

app.use("/api/auth", require("./authentication/routes"));
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
