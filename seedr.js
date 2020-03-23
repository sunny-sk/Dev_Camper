const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const Bootcamp = require("./models/Bootcamp");
const Courses = require("./models/Course");
const Users = require("./models/User");
const Review = require("./models/Review");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const path = require("path");
dotenv.config({ path: "./config/config.env" });

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URL);
  console.log(
    `mongodb Connected at ${conn.connection.host} ${conn.connection.port}`.cyan
      .underline
  );
};
connectDB();

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "/_data/bootcamps.json")}`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "/_data/courses.json")}`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "/_data/users.json")}`, "utf-8")
);
const review = JSON.parse(
  fs.readFileSync(`${path.join(__dirname, "/_data/reviews.json")}`, "utf-8")
);

const importData = async () => {
  try {
    await Review.create(review);
    console.log("data imported ".green.inverse);
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    let data = await Bootcamp.deleteMany();
    console.log("data deleted".red.inverse);
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
