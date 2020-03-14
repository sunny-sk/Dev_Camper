const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const p = require("./data/bootcamps");
require("colors");
const Bootcamp = require("./models/Bootcamp");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

dotenv.config({ path: "./config/config.env" });

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URL);
  console.log(
    `mongodb Connected at ${conn.connection.host} ${conn.connection.port}`.cyan
      .underline
  );
};
connectDB();

const importData = async () => {
  // const bootcamps = JSON.parse(
  //   fs.readFileSync(`${__dirname}/data/bootcamps.js`, "utf-8")
  // );

  try {
    let data = new Bootcamp({
      name: "Devworks Bootcamp",
      description:
        "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
      website: "https://devworks.com",
      phone: "1234567890",
      email: "enroll@devworks.com",
      address: "233 Bay State Rd Boston MA 02215",
      careers: ["Web Development", "UI/UX", "Business"],
      housing: true,
      jobAssistance: true,
      jobGuarantee: false,
      acceptGi: true
    });
    await data.save();
    console.log("data saved".green.inverse);
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
