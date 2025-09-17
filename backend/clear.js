const mongoose = require("mongoose");
const College = require("./models/College");

const MONGO_URI = "mongodb://127.0.0.1:27017/collegePredictor";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected ✅");
    await College.deleteMany({});
    console.log("All old college data deleted 🚮");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
