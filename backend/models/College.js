const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
  name: String,
  exam: String, // "TS-EAMCET" or "JEE"
  branch: String,
  category: String,
  gender: String,
  cutoffRank: Number,
  location: String,
  type: {
    type: String,
    enum: ["Government", "Private"], // valid values
    required: true,
  },
  fees: Number,
});

module.exports = mongoose.model("College", CollegeSchema);
