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

const { protect, authorize } = require('../middleware/auth')


const { mySingleUpload } = require('../middleware/uploadImage')
router.use("/:id/courses", courseRouter);
router.get("/", getAllBootcamps);
router.get("/:radius/:zipcode/:distance", getBootcampsInRadius);
router.get("/:id", getBootcamp);
router.post("/", protect, authorize('publisher', 'admin'), createBootcamp);
router.put("/:id", protect, authorize('publisher', 'admin'), updateBootcamp);

router.put("/:id/photo", protect, authorize('publisher', 'admin'), mySingleUpload, bootcampPhotoUpload);
router.delete("/:id", protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
