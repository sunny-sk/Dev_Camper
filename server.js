const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const connctDB = require("./config/db");
const colors = require("colors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 5000;

//rate limit request
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});

//middleware
dotenv.config({ path: "./config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(mongoSanitize());
app.use(cors());
app.use(helmet());
app.use(xssClean());
app.use(limiter);
app.use(hpp());

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const errorHandler = require("./middleware/error");
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
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
