const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
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

const bootCampData = [
  {
    "_id": "5d713995b721c3bb38c1f5d0",
    "name": "Devworks Bootcamp",
    "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
    "website": "https://devworks.com",
    "phone": "7836072135",
    "email": "enroll@devworks.com",
    "address": "233 Bay State Rd Boston MA 02215",
    "careers": ["Web Development", "UI/UX", "Business"],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
  },
  {
    "_id": "5d713a66ec8f2b88b8f830b8",
    "name": "ModernTech Bootcamp",
    "description": "ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX",
    "website": "https://moderntech.com",
    "phone": "7836072135",
    "email": "enroll@moderntech.com",
    "address": "220 Pawtucket St, Lowell, MA 01854",
    "careers": ["Web Development", "UI/UX", "Mobile Development"],
    "housing": false,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
  },
  {
    "_id": "5d725a037b292f5f8ceff787",
    "name": "Codemasters",
    "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
    "website": "https://codemasters.com",
    "phone": "7836072135",
    "email": "enroll@codemasters.com",
    "address": "85 South Prospect Street Burlington VT 05405",
    "careers": ["Web Development", "Data Science", "Business"],
    "housing": false,
    "jobAssistance": false,
    "jobGuarantee": false,
    "acceptGi": false
  },
  {
    "_id": "5d725a1b7b292f5f8ceff788",
    "name": "Devcentral Bootcamp",
    "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
    "website": "https://devcentral.com",
    "phone": "7836072135",
    "email": "enroll@devcentral.com",
    "address": "45 Upper College Rd Kingston RI 02881",
    "careers": [
      "Mobile Development",
      "Web Development",
      "Data Science",
      "Business"
    ],
    "housing": false,
    "jobAssistance": true,
    "jobGuarantee": true,
    "acceptGi": true
  }
]



const importData = async () => {

  console.log(process.env.GEO_CODER_PROVIDER)
  try {
    for (let i = 0; i < bootCampData.length; i++) {
      let data = new Bootcamp(bootCampData[i]);
      await data.save();
    }
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


console.log("hello world")