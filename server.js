const express = require("express");
const connectDB = require("./db");

// Connecting the Database
connectDB();

const app = express();
app.use(express.json());
const PORT = 5001;

app.use("/api/auth", require("./auth/Route"));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
