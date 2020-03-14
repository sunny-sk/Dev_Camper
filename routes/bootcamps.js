const express = require("express");
const router = express.Router();

const courseRouter = require("./courses");

const {
  getAllBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require("../controller/bootcamps");

router.use("/:id/courses", courseRouter);
router.get("/", getAllBootcamps);
router.get("/:radius/:zipcode/:distance", getBootcampsInRadius);
router.get("/:id", getBootcamp);
router.post("/", createBootcamp);
router.put("/:id", updateBootcamp);
router.delete("/:id", deleteBootcamp);

module.exports = router;
