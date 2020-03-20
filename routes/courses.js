const express = require("express");
const router = express.Router({ mergeParams: true });

const { getAllCourses, getCourse, updateCourse, deleteCourse, createCourse } = require("../controller/course");


//@desc comes from /bootcamps/:id/courses
router.get("/", getAllCourses);
router.post("/", createCourse);


//@desc comes from /courses
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
