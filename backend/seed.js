const mongoose = require("mongoose");
const dotenv = require("dotenv");
const College = require("./models/College");

dotenv.config(); // loads MONGO_URI from .env

const colleges = [
  {
    name: "JNTU Hyderabad",
    exam: "TS-EAMCET",
    branch: "CSE",
    category: "BC-A",
    gender: "Male",
    cutoffRank: 15000,
    location: "Hyderabad",
    type: "Government",
    fees: 50000,
  },
  {
    name: "OU College of Engineering",
    exam: "TS-EAMCET",
    branch: "CSE",
    category: "BC-A",
    gender: "Male",
    cutoffRank: 20000,
    location: "Hyderabad",
    type: "Government",
    fees: 60000,
  },
  {
    name: "CBIT Hyderabad",
    exam: "TS-EAMCET",
    branch: "CSE",
    category: "BC-A",
    gender: "Male",
    cutoffRank: 25000,
    location: "Hyderabad",
    type: "Private",
    fees: 125000,
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // Delete existing data first
    await College.deleteMany({});
    console.log("Old data deleted 🚮");

    // Insert new sample data
    await College.insertMany(colleges);
    console.log("Sample Data Imported! 🎉");

    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
