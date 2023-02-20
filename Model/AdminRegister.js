const mongoose = require("mongoose");
require("dotenv").config();

const AdminRegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: "admin" },
});

const AdminRegisterModel = mongoose.model("adminregister", AdminRegisterSchema);

module.exports = { AdminRegisterModel };