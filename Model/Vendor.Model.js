const mongoose = require("mongoose");
require("dotenv").config();

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, default: "vendor" },
});

const VendorModel = mongoose.model("vendors", vendorSchema);

module.exports = { VendorModel };
