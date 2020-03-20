const express = require("express");
const router = express.Router();

const courseRouter = require("./courses");

const {
  getAllBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controller/bootcamps");

const { mySingleUpload } = require('../middleware/uploadImage')
router.use("/:id/courses", courseRouter);
router.get("/", getAllBootcamps);
router.get("/:radius/:zipcode/:distance", getBootcampsInRadius);
router.get("/:id", getBootcamp);
router.post("/", createBootcamp);
router.put("/:id", updateBootcamp);
// router.post("/:id/photo", mySingleUpload, function (req, res, next) {
//   console.log(req.file)
//   res.send("kjhgjkl")
// });
router.put("/:id/photo", mySingleUpload, bootcampPhotoUpload);
router.delete("/:id", deleteBootcamp);

module.exports = router;
