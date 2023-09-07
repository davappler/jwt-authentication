const Mongoose = require("mongoose");
const localDB = "mongodb://mongo:27017/role_auth";
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};
module.exports = connectDB;
