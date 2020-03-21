const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const connctDB = require("./config/db");
require("colors");
// const fileupload = require('express-fileupload')

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(fileupload())

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require('./routes/auth')

const errorHandler = require("./middleware/error");
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server started at ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold
  );
  connctDB();
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`error : ${err.message}`.red.bold);
  process.exit(1);
});
