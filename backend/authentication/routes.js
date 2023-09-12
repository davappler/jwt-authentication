const express = require("express");
const router = express.Router();
const { register, login } = require("./auth");
// const { adminAuth } = require("../middleware/admin/auth");

router.route("/register").post(register);
router.route("/login").post(login);

// Admin routes, with middleware not useful for now
// router.route("/update").put(adminAuth, update);
// router.route("/deleteUser").delete(adminAuth, deleteUser);
module.exports = router;
