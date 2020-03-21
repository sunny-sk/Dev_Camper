const express = require("express");
const router = express.Router({ mergeParams: true });

const { getAllCourses, getCourse, updateCourse, deleteCourse, createCourse } = require("../controller/course");
const { protect, authorize } = require('../middleware/auth')

//@desc comes from /bootcamps/:id/courses
router.get("/", getAllCourses);
router.post("/", protect, authorize('publisher', 'admin'), createCourse);


//@desc comes from /courses
router.get("/:id", getCourse);
router.put("/:id", protect, authorize('publisher', 'admin'), updateCourse);
router.delete("/:id", protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
