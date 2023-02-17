const mongoose = require("mongoose");
require("dotenv").config();

const wenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: "wender" },
});

const WenderModel = mongoose.model("wender", wenderSchema);

module.exports = { WenderModel };
