const express = require("express");
const router = express.Router({ mergeParams: true });

const { getAllCourses, getCourse } = require("../controller/course");

router.get("/", getAllCourses);

// router.get("/:id", getCourse);
// router.post("/", createCourse);
// router.put("/:id", updateCourse);
// router.delete("/:id", deleteCourse);

module.exports = router;
